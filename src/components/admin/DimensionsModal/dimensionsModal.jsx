import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faRulerCombined,
  faPlus,
  faTrash,
  faRuler,
  faWarehouse,
  faWeightHanging,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
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
  ErrorMessage,
  ModalFooter,
  SubmitButton,
  CancelButton,
  FormSection,
  FormSectionTitle,
  FormGrid,
  RequiredMark,
  FormDivider,
  InputWithIcon,
  InputIcon,
  ColorSection,
  ColorHeader,
  AddColorButton,
  ColorList,
  ColorItem,
  ColorData,
  ColorPreview,
  ColorPickerLabel,
  ColorPicker,
  RemoveColorButton,
  NoColorsMessage,
  DimensionsIllustration,
  DimensionMarker,
  EmptyColorPickerMessage,
} from "./dimensionsModalStyles";

const DimensionsModal = ({ isOpen, onClose, onSubmit, carData }) => {
  // Transform colors data to ensure consistent property names
  const normalizeColors = (colorsData) => {
    if (!colorsData || !colorsData.length) {
      return [{ name: "", color: "#FFFFFF" }];
    }

    return colorsData.map((colorItem) => ({
      name: colorItem.name || "",
      // Use color property for consistency with the car details component
      color: colorItem.color || "#FFFFFF",
    }));
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      length: carData?.dimensions?.length || "",
      width: carData?.dimensions?.width || "",
      height: carData?.dimensions?.height || "",
      wheelbase: carData?.dimensions?.wheelbase || "",
      groundClearance: carData?.groundClearance || "",
      cargoSpace: carData?.cargoSpace || "",
      curbWeight: carData?.curbWeight || "",
      colors: normalizeColors(carData?.colors),
    },
  });

  // Reset form when carData changes
  useEffect(() => {
    if (carData) {
      reset({
        length: carData?.dimensions?.length || "",
        width: carData?.dimensions?.width || "",
        height: carData?.dimensions?.height || "",
        wheelbase: carData?.dimensions?.wheelbase || "",
        groundClearance: carData?.groundClearance || "",
        cargoSpace: carData?.cargoSpace || "",
        curbWeight: carData?.curbWeight || "",
        colors: normalizeColors(carData?.colors),
      });
    }
  }, [carData, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "colors",
  });

  const watchColors = watch("colors");
  const watchLength = watch("length");
  const watchWidth = watch("width");
  const watchHeight = watch("height");

  const handleColorChange = (index, e) => {
    setValue(`colors.${index}.color`, e.target.value);
  };

  const addColor = () => {
    append({ name: "", color: "#FFFFFF" });
  };

  const onFormSubmit = async (data) => {
    try {
      // Transform dimensions into proper format
      const formattedData = {
        ...data,
        dimensions: {
          length: data.length,
          width: data.width,
          height: data.height,
          wheelbase: data.wheelbase,
        },
      };

      await onSubmit(formattedData);
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
            <FontAwesomeIcon icon={faRulerCombined} /> Edit Dimensions & Colors
          </ModalTitle>
          <CloseButton onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <form id="dimensions-form" onSubmit={handleSubmit(onFormSubmit)}>
            <FormSection>
              <FormSectionTitle>
                <FontAwesomeIcon icon={faRuler} /> Physical Dimensions
              </FormSectionTitle>

              <DimensionsIllustration>
                <DimensionMarker className="length" active={!!watchLength}>
                  <span>Length</span>
                </DimensionMarker>
                <DimensionMarker className="width" active={!!watchWidth}>
                  <span>Width</span>
                </DimensionMarker>
                <DimensionMarker className="height" active={!!watchHeight}>
                  <span>Height</span>
                </DimensionMarker>
              </DimensionsIllustration>

              <FormGrid columns={2}>
                <FormGroup>
                  <Label htmlFor="length">
                    Length <RequiredMark>*</RequiredMark>
                  </Label>
                  <InputWithIcon>
                    <InputIcon>
                      <FontAwesomeIcon icon={faRuler} />
                    </InputIcon>
                    <Input
                      id="length"
                      type="text"
                      leftIcon={true}
                      {...register("length", {
                        required: "Length is required",
                        pattern: {
                          value: /^[\d,]+ (mm|cm|m)$/,
                          message: "Format: XXX mm/cm/m (e.g., 4,500 mm)",
                        },
                      })}
                      placeholder="e.g., 4,500 mm"
                      aria-invalid={errors.length ? "true" : "false"}
                    />
                  </InputWithIcon>
                  {errors.length && (
                    <ErrorMessage>{errors.length.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="width">
                    Width <RequiredMark>*</RequiredMark>
                  </Label>
                  <InputWithIcon>
                    <InputIcon>
                      <FontAwesomeIcon icon={faRuler} />
                    </InputIcon>
                    <Input
                      id="width"
                      type="text"
                      leftIcon={true}
                      {...register("width", {
                        required: "Width is required",
                        pattern: {
                          value: /^[\d,]+ (mm|cm|m)$/,
                          message: "Format: XXX mm/cm/m (e.g., 1,800 mm)",
                        },
                      })}
                      placeholder="e.g., 1,800 mm"
                      aria-invalid={errors.width ? "true" : "false"}
                    />
                  </InputWithIcon>
                  {errors.width && (
                    <ErrorMessage>{errors.width.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="height">
                    Height <RequiredMark>*</RequiredMark>
                  </Label>
                  <InputWithIcon>
                    <InputIcon>
                      <FontAwesomeIcon icon={faRuler} />
                    </InputIcon>
                    <Input
                      id="height"
                      type="text"
                      leftIcon={true}
                      {...register("height", {
                        required: "Height is required",
                        pattern: {
                          value: /^[\d,]+ (mm|cm|m)$/,
                          message: "Format: XXX mm/cm/m (e.g., 1,500 mm)",
                        },
                      })}
                      placeholder="e.g., 1,500 mm"
                      aria-invalid={errors.height ? "true" : "false"}
                    />
                  </InputWithIcon>
                  {errors.height && (
                    <ErrorMessage>{errors.height.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="wheelbase">
                    Wheelbase <RequiredMark>*</RequiredMark>
                  </Label>
                  <InputWithIcon>
                    <InputIcon>
                      <FontAwesomeIcon icon={faRuler} />
                    </InputIcon>
                    <Input
                      id="wheelbase"
                      type="text"
                      leftIcon={true}
                      {...register("wheelbase", {
                        required: "Wheelbase is required",
                        pattern: {
                          value: /^[\d,]+ (mm|cm|m)$/,
                          message: "Format: XXX mm/cm/m (e.g., 2,700 mm)",
                        },
                      })}
                      placeholder="e.g., 2,700 mm"
                      aria-invalid={errors.wheelbase ? "true" : "false"}
                    />
                  </InputWithIcon>
                  {errors.wheelbase && (
                    <ErrorMessage>{errors.wheelbase.message}</ErrorMessage>
                  )}
                </FormGroup>
              </FormGrid>
            </FormSection>

            <FormDivider />

            <FormSection>
              <FormSectionTitle>
                <FontAwesomeIcon icon={faWarehouse} /> Clearance & Capacity
              </FormSectionTitle>

              <FormGrid columns={3}>
                <FormGroup>
                  <Label htmlFor="groundClearance">
                    Ground Clearance <RequiredMark>*</RequiredMark>
                  </Label>
                  <InputWithIcon>
                    <InputIcon>
                      <FontAwesomeIcon icon={faRuler} />
                    </InputIcon>
                    <Input
                      id="groundClearance"
                      type="text"
                      leftIcon={true}
                      {...register("groundClearance", {
                        required: "Ground clearance is required",
                        pattern: {
                          value: /^[\d,]+ (mm|cm)$/,
                          message: "Format: XXX mm/cm (e.g., 170 mm)",
                        },
                      })}
                      placeholder="e.g., 170 mm"
                      aria-invalid={errors.groundClearance ? "true" : "false"}
                    />
                  </InputWithIcon>
                  {errors.groundClearance && (
                    <ErrorMessage>
                      {errors.groundClearance.message}
                    </ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="cargoSpace">
                    Cargo Space <RequiredMark>*</RequiredMark>
                  </Label>
                  <InputWithIcon>
                    <InputIcon>
                      <FontAwesomeIcon icon={faWarehouse} />
                    </InputIcon>
                    <Input
                      id="cargoSpace"
                      type="text"
                      leftIcon={true}
                      {...register("cargoSpace", {
                        required: "Cargo space is required",
                        pattern: {
                          value: /^[\d,]+ (l|L|liters|litres)$/,
                          message:
                            "Format: XXX l/L/liters/litres (e.g., 450 L)",
                        },
                      })}
                      placeholder="e.g., 450 L"
                      aria-invalid={errors.cargoSpace ? "true" : "false"}
                    />
                  </InputWithIcon>
                  {errors.cargoSpace && (
                    <ErrorMessage>{errors.cargoSpace.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="curbWeight">
                    Curb Weight <RequiredMark>*</RequiredMark>
                  </Label>
                  <InputWithIcon>
                    <InputIcon>
                      <FontAwesomeIcon icon={faWeightHanging} />
                    </InputIcon>
                    <Input
                      id="curbWeight"
                      type="text"
                      leftIcon={true}
                      {...register("curbWeight", {
                        required: "Curb weight is required",
                        pattern: {
                          value: /^[\d,]+ (kg|kilograms)$/,
                          message: "Format: XXX kg/kilograms (e.g., 1,450 kg)",
                        },
                      })}
                      placeholder="e.g., 1,450 kg"
                      aria-invalid={errors.curbWeight ? "true" : "false"}
                    />
                  </InputWithIcon>
                  {errors.curbWeight && (
                    <ErrorMessage>{errors.curbWeight.message}</ErrorMessage>
                  )}
                </FormGroup>
              </FormGrid>
            </FormSection>

            <FormDivider />

            <ColorSection>
              <ColorHeader>
                <FormSectionTitle>
                  <FontAwesomeIcon icon={faPalette} /> Available Colors
                </FormSectionTitle>
                <AddColorButton type="button" onClick={addColor}>
                  <FontAwesomeIcon icon={faPlus} /> Add Color
                </AddColorButton>
              </ColorHeader>

              {fields.length === 0 ? (
                <NoColorsMessage>
                  No colors added yet. Click the "Add Color" button to add
                  available colors.
                </NoColorsMessage>
              ) : (
                <ColorList>
                  {fields.map((item, index) => (
                    <ColorItem key={item.id}>
                      <ColorData>
                        <FormGroup>
                          <Label htmlFor={`colors.${index}.name`}>
                            Color Name <RequiredMark>*</RequiredMark>
                          </Label>
                          <Input
                            id={`colors.${index}.name`}
                            type="text"
                            {...register(`colors.${index}.name`, {
                              required: "Color name is required",
                            })}
                            placeholder="e.g., Cosmic Black"
                            aria-invalid={
                              errors.colors?.[index]?.name ? "true" : "false"
                            }
                          />
                          {errors.colors?.[index]?.name && (
                            <ErrorMessage>
                              {errors.colors[index].name.message}
                            </ErrorMessage>
                          )}
                        </FormGroup>

                        <FormGroup isColorPicker={true}>
                          <ColorPickerLabel>
                            <span>
                              Color Code <RequiredMark>*</RequiredMark>
                            </span>
                            <ColorPreview
                              style={{
                                backgroundColor:
                                  watchColors[index]?.color || "#FFFFFF",
                              }}
                            />
                          </ColorPickerLabel>
                          <ColorPicker
                            type="color"
                            value={watchColors[index]?.color || "#FFFFFF"}
                            onChange={(e) => handleColorChange(index, e)}
                            {...register(`colors.${index}.color`, {
                              required: "Color code is required",
                            })}
                          />
                          {errors.colors?.[index]?.color && (
                            <ErrorMessage>
                              {errors.colors[index].color.message}
                            </ErrorMessage>
                          )}
                          <EmptyColorPickerMessage>
                            Click to open color picker
                          </EmptyColorPickerMessage>
                        </FormGroup>
                      </ColorData>

                      <RemoveColorButton
                        type="button"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                        aria-label="Remove color"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </RemoveColorButton>
                    </ColorItem>
                  ))}
                </ColorList>
              )}
            </ColorSection>
          </form>
        </ModalBody>

        <ModalFooter>
          <CancelButton type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </CancelButton>
          <SubmitButton
            type="submit"
            form="dimensions-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </SubmitButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DimensionsModal;
