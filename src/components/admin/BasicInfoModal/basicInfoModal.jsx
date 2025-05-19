import React from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  FormGroup,
  Label,
  Input,
  TextArea,
  ErrorMessage,
  ModalFooter,
  SubmitButton,
  CancelButton,
  FormGrid,
  FormColumn,
  RequiredMark,
  FormRow,
  FormDivider,
  FormSection,
  FormSectionTitle,
} from "./basicInfoModalStyles";

const BasicInfoModal = ({ isOpen, onClose, onSubmit, carData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: carData?.name || "",
      brand: carData?.brand || "",
      launchDate: carData?.launchDate
        ? new Date(carData.launchDate).toISOString().split("T")[0]
        : "",
      price: carData?.price || "",
      engine: carData?.engine || "",
      category: carData?.category || "",
      description: carData?.description || "",
    },
  });

  const onFormSubmit = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>
            <FontAwesomeIcon icon={faInfoCircle} /> Edit Basic Information
          </ModalTitle>
          <CloseButton onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <form id="basic-info-form" onSubmit={handleSubmit(onFormSubmit)}>
            <FormSection>
              <FormSectionTitle>Car Details</FormSectionTitle>
              <FormGrid>
                <FormColumn>
                  <FormGroup>
                    <Label htmlFor="name">
                      Name <RequiredMark>*</RequiredMark>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      {...register("name", {
                        required: "Name is required",
                        maxLength: {
                          value: 100,
                          message: "Name cannot exceed 100 characters",
                        },
                      })}
                      placeholder="Enter car name"
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                    {errors.name && (
                      <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="brand">
                      Brand <RequiredMark>*</RequiredMark>
                    </Label>
                    <Input
                      id="brand"
                      type="text"
                      {...register("brand", { required: "Brand is required" })}
                      placeholder="Enter brand name"
                      aria-invalid={errors.brand ? "true" : "false"}
                    />
                    {errors.brand && (
                      <ErrorMessage>{errors.brand.message}</ErrorMessage>
                    )}
                  </FormGroup>
                </FormColumn>

                <FormColumn>
                  <FormGroup>
                    <Label htmlFor="category">
                      Category <RequiredMark>*</RequiredMark>
                    </Label>
                    <Input
                      id="category"
                      type="text"
                      {...register("category", {
                        required: "Category is required",
                      })}
                      placeholder="E.g., SUV, Sedan, Hatchback"
                      aria-invalid={errors.category ? "true" : "false"}
                    />
                    {errors.category && (
                      <ErrorMessage>{errors.category.message}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="launchDate">
                      Launch Date <RequiredMark>*</RequiredMark>
                    </Label>
                    <Input
                      id="launchDate"
                      type="date"
                      {...register("launchDate", {
                        required: "Launch date is required",
                      })}
                      aria-invalid={errors.launchDate ? "true" : "false"}
                    />
                    {errors.launchDate && (
                      <ErrorMessage>{errors.launchDate.message}</ErrorMessage>
                    )}
                  </FormGroup>
                </FormColumn>
              </FormGrid>
            </FormSection>

            <FormDivider />

            <FormSection>
              <FormSectionTitle>Specifications & Pricing</FormSectionTitle>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="engine">
                    Engine <RequiredMark>*</RequiredMark>
                  </Label>
                  <Input
                    id="engine"
                    type="text"
                    {...register("engine", {
                      required: "Engine details are required",
                    })}
                    placeholder="E.g., 2.0L Turbo, 1.5L Hybrid"
                    aria-invalid={errors.engine ? "true" : "false"}
                  />
                  {errors.engine && (
                    <ErrorMessage>{errors.engine.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="price">
                    Price <RequiredMark>*</RequiredMark>
                  </Label>
                  <Input
                    id="price"
                    type="text"
                    {...register("price", {
                      required: "Price is required",
                      pattern: {
                        value: /^[\d,]+(\.\d{1,2})?$/,
                        message: "Please enter a valid price",
                      },
                    })}
                    placeholder="E.g., 15,00,000"
                    aria-invalid={errors.price ? "true" : "false"}
                  />
                  {errors.price && (
                    <ErrorMessage>{errors.price.message}</ErrorMessage>
                  )}
                </FormGroup>
              </FormRow>
            </FormSection>

            <FormDivider />

            <FormSection>
              <FormSectionTitle>Description</FormSectionTitle>
              <FormGroup>
                <Label htmlFor="description">
                  Description <RequiredMark>*</RequiredMark>
                </Label>
                <TextArea
                  id="description"
                  rows={5}
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 50,
                      message: "Description must be at least 50 characters",
                    },
                  })}
                  placeholder="Enter detailed car description"
                  aria-invalid={errors.description ? "true" : "false"}
                />
                {errors.description && (
                  <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
              </FormGroup>
            </FormSection>
          </form>
        </ModalBody>
        <ModalFooter>
          <CancelButton type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </CancelButton>
          <SubmitButton
            type="submit"
            form="basic-info-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </SubmitButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default BasicInfoModal;
