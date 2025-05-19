import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faThLarge,
  faList,
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
} from "./carsStyles";
import { createCar, deleteCar, getAllCars } from "../../../services/admin/api";
import Pagination from "../../../components/admin/Pagination/pagination";
import ConfirmationModal from "../../../components/admin/Confirmation/confirmation";
import CarForm from "../../../components/admin/CarForm/carForm";
import Toast from "../../../components/common/Toast/toast";
import Spinner from "../../../components/common/Spinner/spinner";
import ErrorContainer from "../../../components/common/Error/error";

const CarsManagement = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [imageFile, setImageFile] = useState(null);

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

  const fetchCars = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAllCars(currentPage, itemsPerPage);

      const carsData = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.cars)
        ? response.cars
        : Array.isArray(response)
        ? response
        : [];

      setCars(carsData);
      setFilteredCars(carsData);
      setTotalItems(
        response?.totalItems || response?.totalCars || carsData.length
      );
      setIsLoading(false);
    } catch (error) {
      setError("Failed to fetch cars. Please try again.");
      showToast("Error fetching cars. Please try again.", "error");
      setCars([]);
      setFilteredCars([]);
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  useEffect(() => {
    if (!Array.isArray(cars)) {
      setFilteredCars([]);
      return;
    }

    let result = [...cars];
    if (searchTerm) {
      result = result.filter(
        (car) =>
          (car?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (car?.brand || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      result.sort((a, b) => (a?.name || "").localeCompare(b?.name || "") || 0);
    } else {
      result.sort((a, b) => (b?.name || "").localeCompare(a?.name || "") || 0);
    }

    setFilteredCars(result);
  }, [searchTerm, sortOrder, cars]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
    }
  };

  const resetForm = () => {
    setFormKey(Date.now());
    setImageFile(null);
  };

  const openModal = () => {
    setImagePreview("");
    setImageFile(null);
    resetForm();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      setImagePreview("");
      resetForm();
    }, 100);
  };

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      await createCar(formData);
      showToast("Car created successfully!");
      fetchCars();
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

  const handleDeleteCar = async () => {
    try {
      setConfirmModal((prev) => ({
        ...prev,
        isProcessing: true,
      }));

      await deleteCar(confirmModal.id);
      showToast("Car deleted successfully!");
      fetchCars();
      closeConfirmModal();
    } catch (error) {
      showToast(
        `Error deleting car: ${
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
  const currentItems = filteredCars;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const viewCarDetails = (id) => {
    navigate(`/admin/cars/${id}`);
  };

  const retryFetchCars = () => {
    fetchCars();
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
            <FontAwesomeIcon icon={faPlus} /> Add New Car
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
            placeholder="Search cars..."
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
          <ErrorContainer error={error} onRetry={retryFetchCars} />
        ) : currentItems.length === 0 && !isLoading ? (
          <EmptyState>
            <h3>No cars found</h3>
            <p>Try adjusting your search filters or add a new car.</p>
            <AddButton onClick={() => openModal()}>Add New Car</AddButton>
          </EmptyState>
        ) : viewMode === "grid" ? (
          <GridView>
            {currentItems.map((car) => (
              <BrandCard key={car._id} onClick={() => viewCarDetails(car._id)}>
                {car.image ? (
                  <BrandLogo src={car.image} alt={car.name} />
                ) : (
                  <LogoPlaceholder>
                    <FontAwesomeIcon icon={faCarAlt} />
                  </LogoPlaceholder>
                )}
                <BrandName>{car.name}</BrandName>
                <BrandCardDetails>
                  <BrandDescription>
                    Brand: {car.brand || "N/A"}
                  </BrandDescription>
                  <BrandCountry>
                    Year:{" "}
                    {car.launchDate
                      ? new Date(car.launchDate).getFullYear()
                      : "N/A"}
                  </BrandCountry>
                </BrandCardDetails>
                <BrandActions onClick={(e) => e.stopPropagation()}>
                  <ActionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      openConfirmModal(car._id);
                    }}
                    title="Delete Car"
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
                  <th>Image</th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Year</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </TableHeader>
              <tbody>
                {currentItems.map((car) => (
                  <TableRow
                    key={car._id}
                    onClick={() => viewCarDetails(car._id)}
                  >
                    <TableCell>
                      {car.image ? (
                        <BrandLogo src={car.image} alt={car.name} small />
                      ) : (
                        <LogoPlaceholder small>
                          <FontAwesomeIcon icon={faCarAlt} />
                        </LogoPlaceholder>
                      )}
                    </TableCell>
                    <TableCell nowrap>{car.name}</TableCell>
                    <TableCell>{car.brand || "N/A"}</TableCell>
                    <TableCell nowrap>
                      {car.launchDate
                        ? new Date(car.launchDate).getFullYear()
                        : "N/A"}
                    </TableCell>
                    <TableCell nowrap>
                      {car.price?.toLocaleString() || "N/A"}
                    </TableCell>
                    <TableCell>
                      <BrandActions onClick={(e) => e.stopPropagation()} inline>
                        <ActionButton
                          onClick={(e) => {
                            e.stopPropagation();
                            openConfirmModal(car._id);
                          }}
                          title="Delete Car"
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

      {filteredCars.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
          itemsPerPage={itemsPerPage}
          siblingCount={1}
        />
      )}

      {isModalOpen && (
        <CarForm
          key={formKey}
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={onSubmit}
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          isEdit={false}
          hasFile={!!imageFile}
        />
      )}

      {confirmModal.isOpen && (
        <ConfirmationModal
          title="Delete Car"
          message="Are you sure you want to delete this car? This action cannot be undone."
          onConfirm={handleDeleteCar}
          onCancel={closeConfirmModal}
          isProcessing={confirmModal.isProcessing}
          confirmText="Delete"
          cancelText="Cancel"
          processingText="Processing..."
        />
      )}
    </PageContainer>
  );
};

export default CarsManagement;
