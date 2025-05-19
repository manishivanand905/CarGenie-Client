import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCarSide,
  faGasPump,
  faCogs,
  faCalendarAlt,
  faMoneyBillWave,
  faTachometerAlt,
  faRuler,
  faWeightHanging,
  faBolt,
  faGaugeHigh,
  faShieldAlt,
  faPlus,
  faTrash,
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
  TextArea,
  ImagePreview,
  SubmitButton,
  FormRow,
  FormHint,
  FieldIcon,
  TabContainer,
  TabButton,
  TabContent,
  ImageGallery,
  ImageContainer,
  ImageActions,
  ProConsList,
  AddButton,
  ListItem,
  RemoveButton,
  DimensionsGrid,
  ReactSelectContainer,
  BrandOptionContainer,
  ColorOptionContainer,
  ColorSwatch,
  ColorInput,
  customSelectStyles,
} from "./carFormStyles";
import {
  transmissionTypes,
  fuelTypes,
  carCategories,
  driveTypes,
  carColors,
  commonCarFeatures,
} from "../../../data/admin/carData";
import { getBrandNames } from "../../../services/admin/api";

const BrandOption = ({ innerProps, data, isSelected }) => (
  <BrandOptionContainer {...innerProps} isSelected={isSelected}>
    <span>{data.label}</span>
  </BrandOptionContainer>
);

const ColorOptionComponent = ({ innerProps, data, isSelected }) => (
  <ColorOptionContainer {...innerProps} isSelected={isSelected}>
    <ColorSwatch color={data.value} />
    <span>{data.label}</span>
  </ColorOptionContainer>
);

const CarForm = ({
  isOpen,
  onClose,
  onSubmit,
  imagePreview,
  onImageChange,
  hasFile,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      brand: null,
      engine: "",
      description: "",
      launchDate: new Date().toISOString().split("T")[0],
      price: "",
      horsepower: "",
      torque: "",
      topSpeed: "",
      acceleration: "",
      transmission: null,
      fuelType: null,
      mileage: "",
      fuelTankCapacity: "",
      driveType: null,
      category: null,
      length: "",
      width: "",
      height: "",
      wheelbase: "",
      groundClearance: "",
      cargoSpace: "",
      curbWeight: "",
      safetyRating: "", // Changed from null to empty string
      airbags: "", // Changed from null to empty string
    },
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [pros, setPros] = useState([]);
  const [cons, setCons] = useState([]);
  const [safetyFeatures, setSafetyFeatures] = useState([]);
  const [newPro, setNewPro] = useState("");
  const [newCon, setNewCon] = useState("");
  const [newSafetyFeature, setNewSafetyFeature] = useState("");
  const [brandOptions, setBrandOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [colorsList, setColorsList] = useState([]);
  const [newColorName, setNewColorName] = useState("");
  const [newColorCode, setNewColorCode] = useState("#000000");
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrandNames();
        if (data && Array.isArray(data)) {
          setBrandOptions(
            data.map((brand) => ({
              value: brand._id,
              label: brand.name,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    reset();
    setPros([]);
    setCons([]);
    setSafetyFeatures([]);
    setImages([]);
    setImageFiles([]);
    setColorsList([]);
    setValidationErrors([]);
  }, [reset]);

  const validateForm = (data) => {
    const errors = [];

    // Check required fields
    if (!data.name) errors.push("Car Name is required");
    if (!data.brand) errors.push("Brand is required");
    if (!data.description) errors.push("Description is required");
    if (!data.engine) errors.push("Engine is required");
    if (!data.driveType) errors.push("Drive Type is required");
    if (!data.category) errors.push("Category is required");
    if (!data.horsepower) errors.push("Horsepower is required");
    if (!data.torque) errors.push("Torque is required");
    if (!data.topSpeed) errors.push("Top Speed is required");
    if (!data.acceleration) errors.push("Acceleration is required");
    if (!data.transmission) errors.push("Transmission is required");
    if (!data.fuelType) errors.push("Fuel Type is required");
    if (!data.mileage) errors.push("Mileage is required");
    if (!data.fuelTankCapacity) errors.push("Fuel Tank Capacity is required");
    if (!data.length) errors.push("Length is required");
    if (!data.width) errors.push("Width is required");
    if (!data.height) errors.push("Height is required");
    if (!data.wheelbase) errors.push("Wheelbase is required");
    if (!data.groundClearance) errors.push("Ground Clearance is required");
    if (!data.cargoSpace) errors.push("Cargo Space is required");
    if (!data.curbWeight) errors.push("Curb Weight is required");

    // Check images
    if (imageFiles.length === 0) errors.push("At least one image is required");

    return errors;
  };

  const handleFormSubmit = async (data) => {
    try {
      const errors = validateForm(data);

      if (errors.length > 0) {
        setValidationErrors(errors);
        setActiveTab(getTabWithErrors(errors));
        return;
      }

      setIsSubmitting(true);
      setValidationErrors([]);

      const formData = new FormData();

      // Required fields based on controller validation
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("engine", data.engine);
      formData.append("description", data.description);
      formData.append("brandId", data.brand.value);
      formData.append("launchDate", data.launchDate);
      formData.append("driveType", data.driveType.value);
      formData.append("category", data.category.value);
      formData.append("horsepower", data.horsepower);
      formData.append("torque", data.torque);
      formData.append("topSpeed", data.topSpeed);
      formData.append("acceleration", data.acceleration);
      formData.append("transmission", data.transmission.value);
      formData.append("fuelType", data.fuelType.value);
      formData.append("mileage", data.mileage);
      formData.append("fuelTankCapacity", data.fuelTankCapacity);
      formData.append("length", data.length);
      formData.append("width", data.width);
      formData.append("height", data.height);
      formData.append("wheelbase", data.wheelbase);
      formData.append("groundClearance", data.groundClearance);
      formData.append("cargoSpace", data.cargoSpace);
      formData.append("curbWeight", data.curbWeight);

      if (data.brakingDistance)
        formData.append("brakingDistance", data.brakingDistance);

      if (data.color) {
        const updatedColorsList = colorsList.filter(
          (color) => !color.isPrimary
        );
        updatedColorsList.unshift({
          name: `${data.color.label} (Primary)`,
          color: data.color.value,
          isPrimary: true,
        });
        formData.append("colors", JSON.stringify(updatedColorsList));
      } else if (colorsList.length > 0) {
        formData.append("colors", JSON.stringify(colorsList));
      }

      // Changed: Now using text input values directly
      if (data.safetyRating) formData.append("safetyRating", data.safetyRating);
      if (data.airbags) formData.append("airbags", data.airbags);

      if (data.features?.length > 0) {
        const features = data.features.map((feature) => feature.value);
        formData.append("features", JSON.stringify(features));
      }

      if (pros.length > 0) formData.append("pros", JSON.stringify(pros));
      if (cons.length > 0) formData.append("cons", JSON.stringify(cons));
      if (safetyFeatures.length > 0)
        formData.append("safetyFeatures", JSON.stringify(safetyFeatures));

      if (imageFiles.length > 0) {
        imageFiles.forEach((file) => formData.append("images", file));
      }

      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTabWithErrors = (errors) => {
    const basicFields = [
      "Car Name",
      "Brand",
      "Description",
      "Engine",
      "Category",
    ];
    const performanceFields = [
      "Horsepower",
      "Torque",
      "Top Speed",
      "Acceleration",
      "Drive Type",
      "Transmission",
      "Fuel Type",
      "Mileage",
      "Fuel Tank Capacity",
    ];
    const dimensionsFields = [
      "Length",
      "Width",
      "Height",
      "Wheelbase",
      "Ground Clearance",
      "Cargo Space",
      "Curb Weight",
    ];
    const imagesFields = ["At least one image is required"];

    for (const error of errors) {
      for (const field of basicFields) {
        if (error.includes(field)) return "basic";
      }
      for (const field of performanceFields) {
        if (error.includes(field)) return "performance";
      }
      for (const field of dimensionsFields) {
        if (error.includes(field)) return "dimensions";
      }
      for (const field of imagesFields) {
        if (error.includes(field)) return "images";
      }
    }
    return "basic";
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const remainingSlots = 5 - images.length;
      const filesToAdd = files.slice(0, remainingSlots);

      setImageFiles((prevFiles) => [...prevFiles, ...filesToAdd]);

      Promise.all(
        filesToAdd.map(
          (file) =>
            new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(file);
            })
        )
      ).then((newImages) => {
        setImages((prevImages) => [...prevImages, ...newImages]);
      });
    }

    if (onImageChange) {
      onImageChange(e);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const addPro = () => {
    const trimmedPro = newPro.trim();
    if (trimmedPro) {
      setPros((prev) => [...prev, trimmedPro]);
      setNewPro("");
    }
  };

  const addCon = () => {
    const trimmedCon = newCon.trim();
    if (trimmedCon) {
      setCons((prev) => [...prev, trimmedCon]);
      setNewCon("");
    }
  };

  const addSafetyFeature = () => {
    const trimmedFeature = newSafetyFeature.trim();
    if (trimmedFeature) {
      setSafetyFeatures((prev) => [...prev, trimmedFeature]);
      setNewSafetyFeature("");
    }
  };

  const addColor = () => {
    const trimmedName = newColorName.trim();
    if (trimmedName && newColorCode) {
      setColorsList((prev) => [
        ...prev,
        { name: trimmedName, color: newColorCode },
      ]);
      setNewColorName("");
      setNewColorCode("#000000");
    }
  };

  const removePro = (index) => {
    setPros(pros.filter((_, i) => i !== index));
  };

  const removeCon = (index) => {
    setCons(cons.filter((_, i) => i !== index));
  };

  const removeSafetyFeature = (index) => {
    setSafetyFeatures(safetyFeatures.filter((_, i) => i !== index));
  };

  const removeColor = (index) => {
    setColorsList(colorsList.filter((_, i) => i !== index));
  };

  const handleBrandChange = (option) => {
    setValue("brand", option);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Add New Car</ModalTitle>
          <CloseButton onClick={onClose} title="Close">
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </ModalHeader>

        {validationErrors.length > 0 && (
          <div
            style={{
              backgroundColor: "#ff5252",
              color: "white",
              padding: "10px",
              borderRadius: "4px",
              margin: "10px 0",
            }}
          >
            <strong>Please fix the following errors:</strong>
            <ul style={{ margin: "5px 0 0 20px", padding: 0 }}>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <TabContainer>
          <TabButton
            active={activeTab === "basic"}
            onClick={() => setActiveTab("basic")}
          >
            Basic Info
          </TabButton>
          <TabButton
            active={activeTab === "performance"}
            onClick={() => setActiveTab("performance")}
          >
            Performance
          </TabButton>
          <TabButton
            active={activeTab === "dimensions"}
            onClick={() => setActiveTab("dimensions")}
          >
            Dimensions
          </TabButton>
          <TabButton
            active={activeTab === "features"}
            onClick={() => setActiveTab("features")}
          >
            Features
          </TabButton>
          <TabButton
            active={activeTab === "images"}
            onClick={() => setActiveTab("images")}
          >
            Images
          </TabButton>
        </TabContainer>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <TabContent active={activeTab === "basic"}>
            <FormRow>
              <FormGroup>
                <Label>Car Name *</Label>
                <FieldIcon>
                  <FontAwesomeIcon icon={faCarSide} />
                  <Input
                    {...register("name", { required: "Car name is required" })}
                    error={errors.name}
                    placeholder="Enter car name"
                  />
                </FieldIcon>
                {errors.name && <span>{errors.name.message}</span>}
              </FormGroup>

              <FormGroup>
                <Label>Brand *</Label>
                <ReactSelectContainer>
                  <Controller
                    name="brand"
                    control={control}
                    rules={{ required: "Brand is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={brandOptions}
                        styles={customSelectStyles}
                        placeholder="Select brand"
                        isClearable
                        components={{ Option: BrandOption }}
                        onChange={handleBrandChange}
                        isLoading={brandOptions.length === 0}
                      />
                    )}
                  />
                </ReactSelectContainer>
                {errors.brand && <span>{errors.brand.message}</span>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>Launch Date *</Label>
                <FieldIcon>
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <Input
                    {...register("launchDate", {
                      required: "Launch date is required",
                    })}
                    error={errors.launchDate}
                    type="date"
                  />
                </FieldIcon>
                {errors.launchDate && <span>{errors.launchDate.message}</span>}
              </FormGroup>

              <FormGroup>
                <Label>Price *</Label>
                <FieldIcon>
                  <FontAwesomeIcon icon={faMoneyBillWave} />
                  <Input
                    {...register("price", { required: "Price is required" })}
                    error={errors.price}
                    placeholder="e.g. ₹6,00,000"
                  />
                </FieldIcon>
                {errors.price && <span>{errors.price.message}</span>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>Engine *</Label>
                <FieldIcon>
                  <FontAwesomeIcon icon={faGasPump} />
                  <Input
                    {...register("engine", { required: "Engine is required" })}
                    error={errors.engine}
                    placeholder="e.g. 1.2L K-Series"
                  />
                </FieldIcon>
                {errors.engine && <span>{errors.engine.message}</span>}
              </FormGroup>

              <FormGroup>
                <Label>Category *</Label>
                <ReactSelectContainer>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={carCategories}
                        styles={customSelectStyles}
                        placeholder="Select category"
                        isClearable
                      />
                    )}
                  />
                </ReactSelectContainer>
                {errors.category && <span>{errors.category.message}</span>}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>Description *</Label>
              <TextArea
                {...register("description", {
                  required: "Description is required",
                })}
                error={errors.description}
                rows={4}
                placeholder="Enter car description"
              />
              {errors.description && <span>{errors.description.message}</span>}
            </FormGroup>

            <FormHint style={{ marginTop: "10px", color: "#666" }}>
              Please fill all required fields (*) and proceed to the next tab
            </FormHint>
          </TabContent>

          <TabContent active={activeTab === "performance"}>
            <FormRow>
              <FormGroup>
                <Label>Horsepower *</Label>
                <FieldIcon>
                  <FontAwesomeIcon icon={faCogs} />
                  <Input
                    {...register("horsepower", {
                      required: "Horsepower is required",
                    })}
                    placeholder="e.g. 90 hp"
                    error={errors.horsepower}
                  />
                </FieldIcon>
                {errors.horsepower && <span>{errors.horsepower.message}</span>}
              </FormGroup>

              <FormGroup>
                <Label>Torque *</Label>
                <FieldIcon>
                  <FontAwesomeIcon icon={faBolt} />
                  <Input
                    {...register("torque", { required: "Torque is required" })}
                    placeholder="e.g. 113 Nm"
                    error={errors.torque}
                  />
                </FieldIcon>
                {errors.torque && <span>{errors.torque.message}</span>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>Top Speed *</Label>
                <FieldIcon>
                  <FontAwesomeIcon icon={faGaugeHigh} />
                  <Input
                    {...register("topSpeed", {
                      required: "Top Speed is required",
                    })}
                    placeholder="e.g. 165 km/h"
                    error={errors.topSpeed}
                  />
                </FieldIcon>
                {errors.topSpeed && <span>{errors.topSpeed.message}</span>}
              </FormGroup>

              <FormGroup>
                <Label>Acceleration *</Label>
                <FieldIcon>
                  <FontAwesomeIcon icon={faTachometerAlt} />
                  <Input
                    {...register("acceleration", {
                      required: "Acceleration is required",
                    })}
                    placeholder="e.g. 0-100 km/h in 11.5 sec"
                    error={errors.acceleration}
                  />
                </FieldIcon>
                {errors.acceleration && (
                  <span>{errors.acceleration.message}</span>
                )}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>Braking Distance</Label>
                <Input
                  {...register("brakingDistance")}
                  placeholder="e.g. 44m (100-0 km/h)"
                />
              </FormGroup>

              <FormGroup>
                <Label>Drive Type *</Label>
                <ReactSelectContainer>
                  <Controller
                    name="driveType"
                    control={control}
                    rules={{ required: "Drive Type is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={driveTypes}
                        styles={customSelectStyles}
                        placeholder="Select drive type"
                        isClearable
                      />
                    )}
                  />
                </ReactSelectContainer>
                {errors.driveType && <span>{errors.driveType.message}</span>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>Transmission *</Label>
                <ReactSelectContainer>
                  <Controller
                    name="transmission"
                    control={control}
                    rules={{ required: "Transmission is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={transmissionTypes}
                        styles={customSelectStyles}
                        placeholder="Select transmission"
                        isClearable
                      />
                    )}
                  />
                </ReactSelectContainer>
                {errors.transmission && (
                  <span>{errors.transmission.message}</span>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Fuel Type *</Label>
                <ReactSelectContainer>
                  <Controller
                    name="fuelType"
                    control={control}
                    rules={{ required: "Fuel Type is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={fuelTypes}
                        styles={customSelectStyles}
                        placeholder="Select fuel type"
                        isClearable
                      />
                    )}
                  />
                </ReactSelectContainer>
                {errors.fuelType && <span>{errors.fuelType.message}</span>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>Mileage *</Label>
                <Input
                  {...register("mileage", { required: "Mileage is required" })}
                  placeholder="e.g. 23 km/l"
                  error={errors.mileage}
                />
                {errors.mileage && <span>{errors.mileage.message}</span>}
              </FormGroup>

              <FormGroup>
                <Label>Fuel Tank Capacity *</Label>
                <Input
                  {...register("fuelTankCapacity", {
                    required: "Fuel Tank Capacity is required",
                  })}
                  placeholder="e.g. 37 L"
                  error={errors.fuelTankCapacity}
                />
                {errors.fuelTankCapacity && (
                  <span>{errors.fuelTankCapacity.message}</span>
                )}
              </FormGroup>
            </FormRow>

            <FormHint style={{ marginTop: "10px", color: "#666" }}>
              Please fill all required fields (*) and proceed to the next tab
            </FormHint>
          </TabContent>

          <TabContent active={activeTab === "dimensions"}>
            <DimensionsGrid>
              <FormGroup>
                <Label>Length *</Label>
                <Input
                  {...register("length", { required: "Length is required" })}
                  placeholder="e.g. 3845 mm"
                  error={errors.length}
                />
                {errors.length && <span>{errors.length.message}</span>}
              </FormGroup>

              <FormGroup>
                <Label>Width *</Label>
                <Input
                  {...register("width", { required: "Width is required" })}
                  placeholder="e.g. 1735 mm"
                  error={errors.width}
                />
                {errors.width && <span>{errors.width.message}</span>}
              </FormGroup>

              <FormGroup>
                <Label>Height *</Label>
                <Input
                  {...register("height", { required: "Height is required" })}
                  placeholder="e.g. 1530 mm"
                  error={errors.height}
                />
                {errors.height && <span>{errors.height.message}</span>}
              </FormGroup>

              <FormGroup>
                <Label>Wheelbase *</Label>
                <Input
                  {...register("wheelbase", {
                    required: "Wheelbase is required",
                  })}
                  placeholder="e.g. 2450 mm"
                  error={errors.wheelbase}
                />
                {errors.wheelbase && <span>{errors.wheelbase.message}</span>}
              </FormGroup>
            </DimensionsGrid>

            <FormRow>
              <FormGroup>
                <Label>Ground Clearance *</Label>
                <FieldIcon>
                  <FontAwesomeIcon icon={faRuler} />
                  <Input
                    {...register("groundClearance", {
                      required: "Ground Clearance is required",
                    })}
                    placeholder="e.g. 163 mm"
                    error={errors.groundClearance}
                  />
                </FieldIcon>
                {errors.groundClearance && (
                  <span>{errors.groundClearance.message}</span>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Cargo Space *</Label>
                <Input
                  {...register("cargoSpace", {
                    required: "Cargo Space is required",
                  })}
                  placeholder="e.g. 268 L"
                  error={errors.cargoSpace}
                />
                {errors.cargoSpace && <span>{errors.cargoSpace.message}</span>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>Curb Weight *</Label>
                <FieldIcon>
                  <FontAwesomeIcon icon={faWeightHanging} />
                  <Input
                    {...register("curbWeight", {
                      required: "Curb Weight is required",
                    })}
                    placeholder="e.g. 905 kg"
                    error={errors.curbWeight}
                  />
                </FieldIcon>
                {errors.curbWeight && <span>{errors.curbWeight.message}</span>}
              </FormGroup>

              <FormGroup>
                <Label>Primary Color</Label>
                <ReactSelectContainer>
                  <Controller
                    name="color"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={carColors}
                        styles={customSelectStyles}
                        placeholder="Select primary color"
                        isClearable
                        components={{ Option: ColorOptionComponent }}
                      />
                    )}
                  />
                </ReactSelectContainer>
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>Available Colors</Label>
              <ProConsList>
                {colorsList.map((colorItem, index) => (
                  <ListItem key={index}>
                    <ColorSwatch color={colorItem.color} />
                    {colorItem.name}
                    <RemoveButton
                      onClick={() => removeColor(index)}
                      type="button"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </RemoveButton>
                  </ListItem>
                ))}
                <FormRow>
                  <Input
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    placeholder="Color name (e.g. Sunset Red)"
                  />
                  <ColorInput
                    type="color"
                    value={newColorCode}
                    onChange={(e) => setNewColorCode(e.target.value)}
                  />
                  <AddButton onClick={addColor} type="button">
                    <FontAwesomeIcon icon={faPlus} />
                  </AddButton>
                </FormRow>
              </ProConsList>
            </FormGroup>

            <FormHint style={{ marginTop: "10px", color: "#666" }}>
              Please fill all required fields (*) and proceed to the next tab
            </FormHint>
          </TabContent>
          <TabContent active={activeTab === "features"}>
            <FormRow>
              <FormGroup>
                <Label>Safety Rating</Label>
                <FieldIcon>
                  <FontAwesomeIcon icon={faShieldAlt} />
                  <Input
                    {...register("safetyRating")}
                    placeholder="e.g. 5 Star NCAP"
                    type="text"
                  />
                </FieldIcon>
              </FormGroup>

              <FormGroup>
                <Label>Airbags</Label>
                <FieldIcon>
                  <FontAwesomeIcon icon={faShieldAlt} />
                  <Input
                    {...register("airbags")}
                    placeholder="e.g. 6"
                    type="text"
                  />
                </FieldIcon>
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>Safety Features</Label>
              <ProConsList>
                {safetyFeatures.map((feature, index) => (
                  <ListItem key={index}>
                    {feature}
                    <RemoveButton
                      onClick={() => removeSafetyFeature(index)}
                      type="button"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </RemoveButton>
                  </ListItem>
                ))}
                <FormRow>
                  <Input
                    value={newSafetyFeature}
                    onChange={(e) => setNewSafetyFeature(e.target.value)}
                    placeholder="Add a safety feature (e.g. ABS, ESP, etc.)"
                  />
                  <AddButton onClick={addSafetyFeature} type="button">
                    <FontAwesomeIcon icon={faPlus} />
                  </AddButton>
                </FormRow>
              </ProConsList>
            </FormGroup>

            <FormGroup>
              <Label>Features</Label>
              <ReactSelectContainer>
                <Controller
                  name="features"
                  control={control}
                  render={({ field }) => (
                    <CreatableSelect
                      {...field}
                      isMulti
                      options={commonCarFeatures.map((feature) => ({
                        value: feature,
                        label: feature,
                      }))}
                      styles={customSelectStyles}
                      placeholder="Select or add features"
                    />
                  )}
                />
              </ReactSelectContainer>
              <FormHint>You can type to create new features</FormHint>
            </FormGroup>

            <FormGroup>
              <Label>Pros</Label>
              <ProConsList>
                {pros.map((pro, index) => (
                  <ListItem key={index}>
                    {pro}
                    <RemoveButton
                      onClick={() => removePro(index)}
                      type="button"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </RemoveButton>
                  </ListItem>
                ))}
                <FormRow>
                  <Input
                    value={newPro}
                    onChange={(e) => setNewPro(e.target.value)}
                    placeholder="Add a pro (e.g. Excellent fuel efficiency)"
                  />
                  <AddButton onClick={addPro} type="button">
                    <FontAwesomeIcon icon={faPlus} />
                  </AddButton>
                </FormRow>
              </ProConsList>
            </FormGroup>

            <FormGroup>
              <Label>Cons</Label>
              <ProConsList>
                {cons.map((con, index) => (
                  <ListItem key={index}>
                    {con}
                    <RemoveButton
                      onClick={() => removeCon(index)}
                      type="button"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </RemoveButton>
                  </ListItem>
                ))}
                <FormRow>
                  <Input
                    value={newCon}
                    onChange={(e) => setNewCon(e.target.value)}
                    placeholder="Add a con (e.g. Limited rear space)"
                  />
                  <AddButton onClick={addCon} type="button">
                    <FontAwesomeIcon icon={faPlus} />
                  </AddButton>
                </FormRow>
              </ProConsList>
            </FormGroup>

            <FormHint style={{ marginTop: "10px", color: "#666" }}>
              Optional features section - proceed to the Images tab to finalize
            </FormHint>
          </TabContent>
          <TabContent active={activeTab === "images"}>
            <FormGroup>
              <Label>Car Images (Max 5) *</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple={true}
                disabled={images.length >= 5}
                required={images.length === 0}
              />
              <FormHint>
                {images.length >= 5
                  ? "Maximum of 5 images reached"
                  : images.length === 0
                  ? "Please upload at least one car image (required)"
                  : `You can upload ${5 - images.length} more image${
                      5 - images.length !== 1 ? "s" : ""
                    }`}
              </FormHint>

              {images.length > 0 && (
                <ImageGallery>
                  {images.map((image, index) => (
                    <ImageContainer key={index}>
                      <ImagePreview
                        src={image}
                        alt={`Car preview ${index + 1}`}
                      />
                      <ImageActions>
                        <RemoveButton
                          onClick={() => removeImage(index)}
                          type="button"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </RemoveButton>
                      </ImageActions>
                    </ImageContainer>
                  ))}
                </ImageGallery>
              )}
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Add Car"}
            </SubmitButton>

            <FormHint
              style={{ textAlign: "center", marginTop: "15px", color: "#666" }}
            >
              All fields marked with * are required
            </FormHint>
          </TabContent>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CarForm;
