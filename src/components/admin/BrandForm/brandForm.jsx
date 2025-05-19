import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUpload,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  FormGroup,
  Label,
  Input,
  FileInputWrapper,
  FileInput,
  FileInputLabel,
  TextArea,
  ImagePreview,
  SubmitButton,
  ErrorMessage,
  FormRow,
} from "./brandFormStyles";

const BrandForm = ({
  isOpen,
  onClose,
  onSubmit,
  brand,
  imagePreview,
  onImageChange,
  isEdit = false,
  hasFile = false,
}) => {
  const [fileName, setFileName] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues:
      isEdit && brand
        ? {
            name: brand.name || "",
            description: brand.description || "",
            country: brand.country || "",
            website: brand.website || "",
            founded: brand.founded || "",
            parentCompany: brand.parentCompany || "",
            ceo: brand.ceo || "",
            revenue: brand.revenue || "",
            employees: brand.employees || "",
          }
        : {
            name: "",
            description: "",
            country: "",
            website: "",
            founded: "",
            parentCompany: "",
            ceo: "",
            revenue: "",
            employees: "",
          },
  });

  useEffect(() => {
    if (isOpen) {
      if (isEdit && brand) {
        setValue("name", brand.name || "");
        setValue("description", brand.description || "");
        setValue("country", brand.country || "");
        setValue("website", brand.website || "");
        setValue("founded", brand.founded || "");
        setValue("parentCompany", brand.parentCompany || "");
        setValue("ceo", brand.ceo || "");
        setValue("revenue", brand.revenue || "");
        setValue("employees", brand.employees || "");
      } else {
        reset({
          name: "",
          description: "",
          country: "",
          website: "",
          founded: "",
          parentCompany: "",
          ceo: "",
          revenue: "",
          employees: "",
        });
      }
    }
  }, [isOpen, brand, isEdit, setValue, reset]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
    onImageChange(e);
  };

  const handleFormSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name || "");
      formData.append("description", data.description || "");
      formData.append("country", data.country || "");
      formData.append("founded", data.founded || "");
      formData.append("website", data.website || "");
      formData.append("parentCompany", data.parentCompany || "");
      formData.append("ceo", data.ceo || "");
      formData.append("revenue", data.revenue || "");
      formData.append("employees", data.employees || "");

      const fileInput = document.getElementById("logoUpload");
      const file = fileInput?.files?.[0];

      if (file) {
        formData.append("logo", file);
      }

      await onSubmit(formData);
    } catch (error) {}
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>
            {isEdit && brand ? `Edit ${brand.name}` : "Add New Brand"}
          </ModalTitle>
          <CloseButton onClick={onClose} title="Close">
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormGroup>
            <Label>Brand Logo {!isEdit && "*"}</Label>
            <FileInputWrapper>
              <FileInput
                type="file"
                id="logoUpload"
                accept="image/*"
                onChange={handleFileChange}
                required={!isEdit}
              />
              <FileInputLabel htmlFor="logoUpload">
                <FontAwesomeIcon icon={faUpload} />
                {fileName ? fileName : "Choose a file..."}
              </FileInputLabel>
            </FileInputWrapper>
            {imagePreview && (
              <ImagePreview src={imagePreview} alt="Brand logo preview" />
            )}
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label>Brand Name *</Label>
              <Input
                {...register("name", { required: "Brand name is required" })}
                error={errors.name}
                placeholder="Enter brand name"
              />
              {errors.name && (
                <ErrorMessage>
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {errors.name.message}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Country *</Label>
              <Input
                {...register("country", { required: "Country is required" })}
                error={errors.country}
                placeholder="Enter country of origin"
              />
              {errors.country && (
                <ErrorMessage>
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {errors.country.message}
                </ErrorMessage>
              )}
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>Website</Label>
              <Input {...register("website")} placeholder="Enter website URL" />
            </FormGroup>

            <FormGroup>
              <Label>Founded</Label>
              <Input
                {...register("founded")}
                type="number"
                placeholder="Enter founding year"
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>Parent Company</Label>
              <Input
                {...register("parentCompany")}
                placeholder="Enter parent company"
              />
            </FormGroup>

            <FormGroup>
              <Label>CEO</Label>
              <Input {...register("ceo")} placeholder="Enter CEO name" />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>Revenue</Label>
              <Input
                {...register("revenue")}
                placeholder="Enter annual revenue"
              />
            </FormGroup>

            <FormGroup>
              <Label>Employees</Label>
              <Input
                {...register("employees")}
                type="number"
                placeholder="Enter number of employees"
              />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label>Description *</Label>
            <TextArea
              {...register("description", {
                required: "Description is required",
              })}
              error={errors.description}
              rows={6}
              placeholder="Enter brand description"
            />
            {errors.description && (
              <ErrorMessage>
                <FontAwesomeIcon icon={faExclamationCircle} />
                {errors.description.message}
              </ErrorMessage>
            )}
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Processing..."
              : isEdit
              ? "Update Brand"
              : "Add Brand"}
          </SubmitButton>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default BrandForm;
