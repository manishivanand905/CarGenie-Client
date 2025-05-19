import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faThLarge,
  faList,
  faEdit,
  faTrash,
  faSearch,
  faSortAlphaDown,
  faSortAlphaUp,
  faCarAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  PageContainer,
  Header,
  ActionButtons,
  AddButton,
  ViewToggleButton,
  ViewToggleContainer,
  SearchFilterContainer,
  SearchBar,
  SearchInput,
  SortButton,
  BrandListContainer,
  GridView,
  BrandCard,
  BrandLogo,
  BrandName,
  BrandActions,
  ActionButton,
  TableContainer,
  TableView,
  TableHeader,
  TableRow,
  TableCell,
  LogoPlaceholder,
  BrandCardDetails,
  BrandDescription,
  BrandCountry,
  EmptyState,
} from "./brandsStyles";
import {
  getAllBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../../../services/admin/api";
import Pagination from "../../../components/admin/Pagination/pagination";
import ConfirmationModal from "../../../components/admin/Confirmation/confirmation";
import BrandForm from "../../../components/admin/BrandForm/brandForm";
import Toast from "../../../components/common/Toast/toast";
import Spinner from "../../../components/common/Spinner/spinner";
import ErrorContainer from "../../../components/common/Error/error";

const BrandsManagement = () => {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    id: null,
    isProcessing: false,
  });
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [formKey, setFormKey] = useState(Date.now());
  const [logoFile, setLogoFile] = useState(null);

  const navigate = useNavigate();

  const showToast = (message, type = "success") => {
    setToast({
      visible: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast({
      ...toast,
      visible: false,
    });
  };

  const fetchBrands = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAllBrands(currentPage, itemsPerPage);

      const brandsData = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.brands)
        ? response.brands
        : Array.isArray(response)
        ? response
        : [];

      setBrands(brandsData);
      setFilteredBrands(brandsData);
      setTotalItems(
        response?.totalItems || response?.totalBrands || brandsData.length
      );
      setIsLoading(false);
    } catch (error) {
      setError("Failed to fetch brands. Please try again.");
      showToast("Error fetching brands. Please try again.", "error");
      setBrands([]);
      setFilteredBrands([]);
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  useEffect(() => {
    if (!Array.isArray(brands)) {
      setFilteredBrands([]);
      return;
    }

    let result = [...brands];
    if (searchTerm) {
      result = result.filter(
        (brand) =>
          (brand?.name || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (brand?.description || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      result.sort((a, b) => (a?.name || "").localeCompare(b?.name || "") || 0);
    } else {
      result.sort((a, b) => (b?.name || "").localeCompare(a?.name || "") || 0);
    }

    setFilteredBrands(result);
  }, [searchTerm, sortOrder, brands]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoFile(null);
    }
  };

  const resetForm = () => {
    setFormKey(Date.now());
    setLogoFile(null);
  };

  const openModal = (brand = null) => {
    if (isModalOpen) {
      setIsModalOpen(false);

      setTimeout(() => {
        if (brand) {
          setEditingBrand({ ...brand });
          setImagePreview(brand.logo || "");
          setLogoFile(null);
        } else {
          setEditingBrand(null);
          setImagePreview("");
          setLogoFile(null);
        }

        resetForm();
        setIsModalOpen(true);
      }, 50);
    } else {
      if (brand) {
        setEditingBrand({ ...brand });
        setImagePreview(brand.logo || "");
        setLogoFile(null);
      } else {
        setEditingBrand(null);
        setImagePreview("");
        setLogoFile(null);
      }

      resetForm();
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      setImagePreview("");
      setEditingBrand(null);
      resetForm();
    }, 100);
  };

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);

      if (editingBrand) {
        await updateBrand(editingBrand._id, formData);
        showToast("Brand updated successfully!");
      } else {
        await createBrand(formData);
        showToast("Brand created successfully!");
      }

      fetchBrands();
      closeModal();
    } catch (error) {
      showToast(
        `Error: ${error.response?.data?.message || error.message}`,
        "error"
      );
      setIsLoading(false);
    }
  };

  const openConfirmModal = (id) => {
    setConfirmModal({
      isOpen: true,
      id: id,
      isProcessing: false,
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      isOpen: false,
      id: null,
      isProcessing: false,
    });
  };

  const handleDeleteBrand = async () => {
    try {
      setConfirmModal((prev) => ({
        ...prev,
        isProcessing: true,
      }));

      await deleteBrand(confirmModal.id);
      showToast("Brand deleted successfully!");
      fetchBrands();
      closeConfirmModal();
    } catch (error) {
      showToast(
        `Error deleting brand: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`,
        "error"
      );
      setConfirmModal((prev) => ({
        ...prev,
        isProcessing: false,
      }));
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = filteredBrands;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const viewBrandDetails = (id) => {
    navigate(`/admin/brands/${id}`);
  };

  const retryFetchBrands = () => {
    fetchBrands();
  };

  return (
    <PageContainer>
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={hideToast}
        />
      )}

      {isLoading && <Spinner />}

      <Header>
        <ActionButtons>
          <AddButton onClick={() => openModal()}>
            <FontAwesomeIcon icon={faPlus} /> Add New Brand
          </AddButton>
        </ActionButtons>
        <ViewToggleContainer>
          <ViewToggleButton
            active={viewMode === "grid"}
            onClick={() => setViewMode("grid")}
            title="Grid View"
          >
            <FontAwesomeIcon icon={faThLarge} />
          </ViewToggleButton>
          <ViewToggleButton
            active={viewMode === "table"}
            onClick={() => setViewMode("table")}
            title="Table View"
          >
            <FontAwesomeIcon icon={faList} />
          </ViewToggleButton>
        </ViewToggleContainer>
      </Header>

      <SearchFilterContainer>
        <SearchBar>
          <FontAwesomeIcon icon={faSearch} />
          <SearchInput
            type="text"
            placeholder="Search brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <SortButton onClick={() => setSearchTerm("")} title="Clear search">
              <FontAwesomeIcon icon={faTimes} />
            </SortButton>
          )}
        </SearchBar>

        <SortButton
          onClick={toggleSortOrder}
          title={sortOrder === "asc" ? "Sort A to Z" : "Sort Z to A"}
        >
          <FontAwesomeIcon
            icon={sortOrder === "asc" ? faSortAlphaDown : faSortAlphaUp}
          />
        </SortButton>
      </SearchFilterContainer>

      <BrandListContainer>
        {error ? (
          <ErrorContainer error={error} onRetry={retryFetchBrands} />
        ) : currentItems.length === 0 && !isLoading ? (
          <EmptyState>
            <h3>No brands found</h3>
            <p>Try adjusting your search filters or add a new brand.</p>
            <AddButton onClick={() => openModal()}>Add New Brand</AddButton>
          </EmptyState>
        ) : viewMode === "grid" ? (
          <GridView>
            {currentItems.map((brand) => (
              <BrandCard
                key={brand._id}
                onClick={() => viewBrandDetails(brand._id)}
              >
                {brand.logo ? (
                  <BrandLogo src={brand.logo} alt={brand.name} />
                ) : (
                  <LogoPlaceholder>
                    <FontAwesomeIcon icon={faCarAlt} />
                  </LogoPlaceholder>
                )}
                <BrandName>{brand.name}</BrandName>
                <BrandCardDetails>
                  <BrandDescription>
                    {(brand.description || "").substring(0, 80)}...
                  </BrandDescription>
                  <BrandCountry>{brand.country}</BrandCountry>
                </BrandCardDetails>
                <BrandActions onClick={(e) => e.stopPropagation()}>
                  <ActionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(brand);
                    }}
                    title="Edit Brand"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </ActionButton>
                  <ActionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      openConfirmModal(brand._id);
                    }}
                    title="Delete Brand"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </ActionButton>
                </BrandActions>
              </BrandCard>
            ))}
          </GridView>
        ) : (
          <TableContainer>
            <TableView>
              <TableHeader>
                <tr>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Country</th>
                  <th>Actions</th>
                </tr>
              </TableHeader>
              <tbody>
                {currentItems.map((brand) => (
                  <TableRow
                    key={brand._id}
                    onClick={() => viewBrandDetails(brand._id)}
                  >
                    <TableCell>
                      {brand.logo ? (
                        <BrandLogo src={brand.logo} alt={brand.name} small />
                      ) : (
                        <LogoPlaceholder small>
                          <FontAwesomeIcon icon={faCarAlt} />
                        </LogoPlaceholder>
                      )}
                    </TableCell>
                    <TableCell nowrap>{brand.name}</TableCell>
                    <TableCell truncate>
                      {(brand.description || "").substring(0, 100)}...
                    </TableCell>
                    <TableCell nowrap>{brand.country}</TableCell>
                    <TableCell>
                      <BrandActions onClick={(e) => e.stopPropagation()} inline>
                        <ActionButton
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(brand);
                          }}
                          title="Edit Brand"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        <ActionButton
                          onClick={(e) => {
                            e.stopPropagation();
                            openConfirmModal(brand._id);
                          }}
                          title="Delete Brand"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </ActionButton>
                      </BrandActions>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </TableView>
          </TableContainer>
        )}
      </BrandListContainer>

      {filteredBrands.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
          itemsPerPage={itemsPerPage}
          siblingCount={1}
        />
      )}

      {isModalOpen && (
        <BrandForm
          key={formKey}
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={onSubmit}
          brand={editingBrand}
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          isEdit={!!editingBrand}
          hasFile={!!logoFile}
        />
      )}

      {confirmModal.isOpen && (
        <ConfirmationModal
          title="Delete Brand"
          message="Are you sure you want to delete this brand? This action cannot be undone."
          onConfirm={handleDeleteBrand}
          onCancel={closeConfirmModal}
          isProcessing={confirmModal.isProcessing}
          confirmText="Confirm"
          cancelText="Cancel"
          processingText="Processing..."
        />
      )}
    </PageContainer>
  );
};

export default BrandsManagement;
