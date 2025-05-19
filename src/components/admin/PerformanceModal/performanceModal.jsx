import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faTachometerAlt,
  faGaugeHigh,
  faGasPump,
  faCar,
  faCog,
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
  FormGrid,
  FormDivider,
  FormSection,
  FormSectionTitle,
  RequiredMark,
  InputWithIcon,
  InputIcon,
  InfoTooltip,
  TooltipText,
  SelectWrapper,
  CustomSelect,
} from "./performanceModalStyles";

// Dropdown data options
const transmissionTypes = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
  { value: "cvt", label: "CVT (Continuously Variable Transmission)" },
  { value: "semi-automatic", label: "Semi-Automatic" },
  { value: "dct", label: "DCT (Dual Clutch Transmission)" },
  { value: "amt", label: "AMT (Automated Manual Transmission)" },
];

const fuelTypes = [
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Electric" },
  { value: "hybrid", label: "Hybrid" },
  { value: "plugin_hybrid", label: "Plug-in Hybrid" },
  { value: "cng", label: "CNG (Compressed Natural Gas)" },
  { value: "lpg", label: "LPG (Liquefied Petroleum Gas)" },
  { value: "ethanol", label: "Ethanol" },
  { value: "hydrogen", label: "Hydrogen Fuel Cell" },
];

const driveTypes = [
  { value: "fwd", label: "FWD (Front-Wheel Drive)" },
  { value: "rwd", label: "RWD (Rear-Wheel Drive)" },
  { value: "awd", label: "AWD (All-Wheel Drive)" },
  { value: "4wd", label: "4WD (Four-Wheel Drive)" },
];

// Helper function to find the matching option
const findOption = (options, value) => {
  if (!value) return null;

  // For existing data that might be in string format
  if (typeof value === "string") {
    const lowerValue = value.toLowerCase();

    // First try exact match with value
    let found = options.find(
      (option) => option.value.toLowerCase() === lowerValue
    );

    // Then try partial match with any part of the label or value
    if (!found) {
      found = options.find(
        (option) =>
          option.label.toLowerCase().includes(lowerValue) ||
          option.value.toLowerCase().includes(lowerValue)
      );
    }

    // If still not found, use first option that has any similarity
    if (!found) {
      const words = lowerValue.split(/[\s-_()]/);
      found = options.find((option) =>
        words.some(
          (word) =>
            word.length > 2 &&
            (option.label.toLowerCase().includes(word) ||
              option.value.toLowerCase().includes(word))
        )
      );
    }

    return found || null;
  }

  // For data that's already in the correct format
  if (value && typeof value === "object" && value.value) {
    return options.find((option) => option.value === value.value) || null;
  }

  return null;
};

const PerformanceModal = ({ isOpen, onClose, onSubmit, carData }) => {
  console.log("Car data received:", carData);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      horsepower: carData?.horsepower || "",
      torque: carData?.torque || "",
      topSpeed: carData?.topSpeed || "",
      acceleration: carData?.acceleration || "",
      brakingDistance: carData?.brakingDistance || "",
      driveType: null, // Set dynamically after component mounts
      transmission: null, // Set dynamically after component mounts
      fuelType: null, // Set dynamically after component mounts
      mileage: carData?.mileage || "",
      fuelTankCapacity: carData?.fuelTankCapacity || "",
    },
  });

  // Set dropdown values after component mount to ensure proper selection
  useEffect(() => {
    if (carData) {
      // Find matching options for each dropdown
      const driveTypeOption = findOption(driveTypes, carData.driveType);
      const transmissionOption = findOption(
        transmissionTypes,
        carData.transmission
      );
      const fuelTypeOption = findOption(fuelTypes, carData.fuelType);

      console.log("Setting dropdown values:", {
        driveType: driveTypeOption,
        transmission: transmissionOption,
        fuelType: fuelTypeOption,
      });

      // Update form values
      if (driveTypeOption) setValue("driveType", driveTypeOption);
      if (transmissionOption) setValue("transmission", transmissionOption);
      if (fuelTypeOption) setValue("fuelType", fuelTypeOption);
    }
  }, [carData, setValue]);

  const onFormSubmit = async (data) => {
    try {
      // Format the data for API submission
      const formattedData = {
        ...data,
        // Extract labels for the dropdown values when submitting
        driveType: data.driveType?.label || data.driveType,
        transmission: data.transmission?.label || data.transmission,
        fuelType: data.fuelType?.label || data.fuelType,
      };

      console.log("Submitting formatted data:", formattedData);
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
            <FontAwesomeIcon icon={faTachometerAlt} /> Edit Performance
            Specifications
          </ModalTitle>
          <CloseButton onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <form id="performance-form" onSubmit={handleSubmit(onFormSubmit)}>
            <FormSection>
              <FormSectionTitle>
                <FontAwesomeIcon icon={faGaugeHigh} /> Engine & Power
              </FormSectionTitle>
              <FormGrid>
                <FormGroup>
                  <Label htmlFor="horsepower">
                    Horsepower <RequiredMark>*</RequiredMark>
                    <InfoTooltip>
                      <TooltipText>
                        Maximum power output of the engine
                      </TooltipText>
                    </InfoTooltip>
                  </Label>
                  <InputWithIcon>
                    <InputIcon>
                      <FontAwesomeIcon icon={faTachometerAlt} />
                    </InputIcon>
                    <Input
                      id="horsepower"
                      type="text"
                      {...register("horsepower", {
                        required: "Horsepower is required",
                        pattern: {
                          value: /^[\d.]+ (HP|bhp|PS)$/,
                          message: "Format: XXX HP/bhp/PS (e.g., 250 HP)",
                        },
                      })}
                      placeholder="e.g., 250 HP"
                      aria-invalid={errors.horsepower ? "true" : "false"}
                    />
                  </InputWithIcon>
                  {errors.horsepower && (
                    <ErrorMessage>{errors.horsepower.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="torque">
                    Torque <RequiredMark>*</RequiredMark>
                    <InfoTooltip>
                      <TooltipText>
                        Rotational force produced by the engine
                      </TooltipText>
                    </InfoTooltip>
                  </Label>
                  <InputWithIcon>
                    <InputIcon>
                      <FontAwesomeIcon icon={faTachometerAlt} />
                    </InputIcon>
                    <Input
                      id="torque"
                      type="text"
                      {...register("torque", {
                        required: "Torque is required",
                        pattern: {
                          value: /^[\d.]+ (Nm|lb-ft)$/,
                          message: "Format: XXX Nm/lb-ft (e.g., 350 Nm)",
                        },
                      })}
                      placeholder="e.g., 350 Nm"
                      aria-invalid={errors.torque ? "true" : "false"}
                    />
                  </InputWithIcon>
                  {errors.torque && (
                    <ErrorMessage>{errors.torque.message}</ErrorMessage>
                  )}
                </FormGroup>
              </FormGrid>
            </FormSection>

            <FormDivider />

            <FormSection>
              <FormSectionTitle>
                <FontAwesomeIcon icon={faTachometerAlt} /> Performance Metrics
              </FormSectionTitle>
              <FormGrid>
                <FormGroup>
                  <Label htmlFor="topSpeed">
                    Top Speed <RequiredMark>*</RequiredMark>
                  </Label>
                  <InputWithIcon>
                    <InputIcon>
                      <FontAwesomeIcon icon={faGaugeHigh} />
                    </InputIcon>
                    <Input
                      id="topSpeed"
                      type="text"
                      {...register("topSpeed", {
                        required: "Top speed is required",
                        pattern: {
                          value: /^[\d.]+ (km\/h|mph)$/,
                          message: "Format: XXX km/h or mph (e.g., 220 km/h)",
                        },
                      })}
                      placeholder="e.g., 220 km/h"
                      aria-invalid={errors.topSpeed ? "true" : "false"}
                    />
                  </InputWithIcon>
                  {errors.topSpeed && (
                    <ErrorMessage>{errors.topSpeed.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="acceleration">
                    Acceleration (0-100 km/h) <RequiredMark>*</RequiredMark>
                  </Label>
                  <InputWithIcon>
                    <InputIcon>
                      <FontAwesomeIcon icon={faGaugeHigh} />
                    </InputIcon>
                    <Input
                      id="acceleration"
                      type="text"
                      {...register("acceleration", {
                        required: "Acceleration is required",
                        pattern: {
                          value: /^[\d.]+ (s|sec|seconds)$/,
                          message: "Format: XXX s/sec/seconds (e.g., 7.5 s)",
                        },
                      })}
                      placeholder="e.g., 7.5 s"
                      aria-invalid={errors.acceleration ? "true" : "false"}
                    />
                  </InputWithIcon>
                  {errors.acceleration && (
                    <ErrorMessage>{errors.acceleration.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="brakingDistance">
                    Braking Distance (100-0 km/h)
                  </Label>
                  <InputWithIcon>
                    <InputIcon>
                      <FontAwesomeIcon icon={faGaugeHigh} />
                    </InputIcon>
                    <Input
                      id="brakingDistance"
                      type="text"
                      {...register("brakingDistance", {
                        pattern: {
                          value: /^[\d.]+ m$/,
                          message: "Format: XXX m (e.g., 35 m)",
                        },
                      })}
                      placeholder="e.g., 35 m"
                      aria-invalid={errors.brakingDistance ? "true" : "false"}
                    />
                  </InputWithIcon>
                  {errors.brakingDistance && (
                    <ErrorMessage>
                      {errors.brakingDistance.message}
                    </ErrorMessage>
                  )}
                </FormGroup>
              </FormGrid>
            </FormSection>

            <FormDivider />

            <FormSection>
              <FormSectionTitle>
                <FontAwesomeIcon icon={faCar} /> Drivetrain
              </FormSectionTitle>
              <FormGrid>
                <FormGroup isSelect={true}>
                  <Label htmlFor="driveType">
                    Drive Type <RequiredMark>*</RequiredMark>
                  </Label>
                  <SelectWrapper>
                    <InputIcon>
                      <FontAwesomeIcon icon={faCar} />
                    </InputIcon>
                    <Controller
                      name="driveType"
                      control={control}
                      rules={{ required: "Drive type is required" }}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          options={driveTypes}
                          placeholder="Select drive type..."
                          isSearchable
                          classNamePrefix="select"
                          isClearable
                        />
                      )}
                    />
                  </SelectWrapper>
                  {errors.driveType && (
                    <ErrorMessage>{errors.driveType.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup isSelect={true}>
                  <Label htmlFor="transmission">
                    Transmission <RequiredMark>*</RequiredMark>
                  </Label>
                  <SelectWrapper>
                    <InputIcon>
                      <FontAwesomeIcon icon={faCog} />
                    </InputIcon>
                    <Controller
                      name="transmission"
                      control={control}
                      rules={{ required: "Transmission is required" }}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          options={transmissionTypes}
                          placeholder="Select transmission type..."
                          isSearchable
                          classNamePrefix="select"
                          isClearable
                        />
                      )}
                    />
                  </SelectWrapper>
                  {errors.transmission && (
                    <ErrorMessage>{errors.transmission.message}</ErrorMessage>
                  )}
                </FormGroup>
              </FormGrid>
            </FormSection>

            <FormDivider />

            <FormSection>
              <FormSectionTitle>
                <FontAwesomeIcon icon={faGasPump} /> Fuel & Efficiency
              </FormSectionTitle>
              <FormGrid>
                <FormGroup isSelect={true}>
                  <Label htmlFor="fuelType">
                    Fuel Type <RequiredMark>*</RequiredMark>
                  </Label>
                  <SelectWrapper>
                    <InputIcon>
                      <FontAwesomeIcon icon={faGasPump} />
                    </InputIcon>
                    <Controller
                      name="fuelType"
                      control={control}
                      rules={{ required: "Fuel type is required" }}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          options={fuelTypes}
                          placeholder="Select fuel type..."
                          isSearchable
                          classNamePrefix="select"
                          isClearable
                        />
                      )}
                    />
                  </SelectWrapper>
                  {errors.fuelType && (
                    <ErrorMessage>{errors.fuelType.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="mileage">
                    Mileage <RequiredMark>*</RequiredMark>
                  </Label>
                  <InputWithIcon>
                    <InputIcon>
                      <FontAwesomeIcon icon={faGasPump} />
                    </InputIcon>
                    <Input
                      id="mileage"
                      type="text"
                      {...register("mileage", {
                        required: "Mileage is required",
                        pattern: {
                          value: /^[\d.]+ (km\/l|kmpl|mpg)$/,
                          message:
                            "Format: XXX km/l, kmpl, or mpg (e.g., 15 km/l)",
                        },
                      })}
                      placeholder="e.g., 15 km/l"
                      aria-invalid={errors.mileage ? "true" : "false"}
                    />
                  </InputWithIcon>
                  {errors.mileage && (
                    <ErrorMessage>{errors.mileage.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="fuelTankCapacity">
                    Fuel Tank Capacity <RequiredMark>*</RequiredMark>
                  </Label>
                  <InputWithIcon>
                    <InputIcon>
                      <FontAwesomeIcon icon={faGasPump} />
                    </InputIcon>
                    <Input
                      id="fuelTankCapacity"
                      type="text"
                      {...register("fuelTankCapacity", {
                        required: "Fuel tank capacity is required",
                        pattern: {
                          value: /^[\d.]+ (l|L|liters|litres)$/,
                          message: "Format: XXX l/L/liters/litres (e.g., 55 L)",
                        },
                      })}
                      placeholder="e.g., 55 L"
                      aria-invalid={errors.fuelTankCapacity ? "true" : "false"}
                    />
                  </InputWithIcon>
                  {errors.fuelTankCapacity && (
                    <ErrorMessage>
                      {errors.fuelTankCapacity.message}
                    </ErrorMessage>
                  )}
                </FormGroup>
              </FormGrid>
            </FormSection>
          </form>
        </ModalBody>

        <ModalFooter>
          <CancelButton type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </CancelButton>
          <SubmitButton
            type="submit"
            form="performance-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </SubmitButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PerformanceModal;
