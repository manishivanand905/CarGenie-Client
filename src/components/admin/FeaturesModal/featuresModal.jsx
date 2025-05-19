import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faShieldAlt,
  faPlus,
  faTrash,
  faCheck,
  faThumbsUp,
  faThumbsDown,
  faStar,
  faAsterisk,
  faCarCrash,
  faTools,
  faListUl,
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
  FormDivider,
  RequiredMark,
  InputWithIcon,
  InputIcon,
  AddItemButton,
  FeaturesList,
  FeatureItem,
  FeatureInput,
  RemoveFeatureButton,
  FeaturesGrid,
  ProConContainer,
  ProsSide,
  ConsSide,
  ProConHeader,
  ProConList,
  EmptyFeatureMessage,
  InfoText,
} from "./featuresModalStyles";

const FeaturesModal = ({ isOpen, onClose, onSubmit, carData }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      safetyRating: carData?.safetyRating || "",
      airbags: carData?.airbags || "",
      safetyFeatures:
        carData?.safetyFeatures?.length > 0 ? carData.safetyFeatures : [""],
      features: carData?.features?.length > 0 ? carData.features : [""],
      pros: carData?.pros?.length > 0 ? carData.pros : [""],
      cons: carData?.cons?.length > 0 ? carData.cons : [""],
    },
  });

  // Reset form when carData changes
  useEffect(() => {
    if (carData) {
      reset({
        safetyRating: carData?.safetyRating || "",
        airbags: carData?.airbags || "",
        safetyFeatures:
          carData?.safetyFeatures?.length > 0 ? carData.safetyFeatures : [""],
        features: carData?.features?.length > 0 ? carData.features : [""],
        pros: carData?.pros?.length > 0 ? carData.pros : [""],
        cons: carData?.cons?.length > 0 ? carData.cons : [""],
      });
    }
  }, [carData, reset]);

  const safetyFeaturesArray = useFieldArray({
    control,
    name: "safetyFeatures",
  });

  const featuresArray = useFieldArray({
    control,
    name: "features",
  });

  const prosArray = useFieldArray({
    control,
    name: "pros",
  });

  const consArray = useFieldArray({
    control,
    name: "cons",
  });

  const onFormSubmit = async (data) => {
    try {
      // Filter out empty values
      const filteredData = {
        ...data,
        safetyFeatures: data.safetyFeatures.filter(
          (item) => item.trim() !== ""
        ),
        features: data.features.filter((item) => item.trim() !== ""),
        pros: data.pros.filter((item) => item.trim() !== ""),
        cons: data.cons.filter((item) => item.trim() !== ""),
      };

      await onSubmit(filteredData);
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
            <FontAwesomeIcon icon={faShieldAlt} /> Edit Features & Safety
          </ModalTitle>
          <CloseButton onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <form id="features-form" onSubmit={handleSubmit(onFormSubmit)}>
            <FormSection>
              <FormSectionTitle>
                <FontAwesomeIcon icon={faShieldAlt} /> Safety Ratings
              </FormSectionTitle>

              <FeaturesGrid>
                <FormGroup>
                  <Label htmlFor="safetyRating">
                    Safety Rating <RequiredMark>*</RequiredMark>
                  </Label>
                  <InputWithIcon>
                    <InputIcon>
                      <FontAwesomeIcon icon={faStar} />
                    </InputIcon>
                    <Input
                      id="safetyRating"
                      type="text"
                      leftIcon={true}
                      {...register("safetyRating", {
                        required: "Safety rating is required",
                      })}
                      placeholder="e.g., 5 Star NCAP"
                      aria-invalid={errors.safetyRating ? "true" : "false"}
                    />
                  </InputWithIcon>
                  {errors.safetyRating && (
                    <ErrorMessage>{errors.safetyRating.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="airbags">
                    Airbags <RequiredMark>*</RequiredMark>
                  </Label>
                  <InputWithIcon>
                    <InputIcon>
                      <FontAwesomeIcon icon={faAsterisk} />
                    </InputIcon>
                    <Input
                      id="airbags"
                      type="text"
                      leftIcon={true}
                      {...register("airbags", {
                        required: "Airbags information is required",
                      })}
                      placeholder="e.g., 6 front and side"
                      aria-invalid={errors.airbags ? "true" : "false"}
                    />
                  </InputWithIcon>
                  {errors.airbags && (
                    <ErrorMessage>{errors.airbags.message}</ErrorMessage>
                  )}
                </FormGroup>
              </FeaturesGrid>
            </FormSection>

            <FormDivider />

            <FormSection>
              <FormSectionTitle>
                <FontAwesomeIcon icon={faCarCrash} /> Safety Features
              </FormSectionTitle>

              {safetyFeaturesArray.fields.length === 0 ? (
                <EmptyFeatureMessage>
                  No safety features added yet. Add safety features below.
                </EmptyFeatureMessage>
              ) : (
                <FeaturesList>
                  {safetyFeaturesArray.fields.map((field, index) => (
                    <FeatureItem key={field.id}>
                      <FeatureInput>
                        <FontAwesomeIcon
                          icon={faShieldAlt}
                          className="feature-icon"
                        />
                        <Input
                          {...register(`safetyFeatures.${index}`, {
                            required: "Safety feature is required",
                          })}
                          placeholder="e.g., Anti-lock Braking System (ABS)"
                          aria-invalid={
                            errors.safetyFeatures?.[index] ? "true" : "false"
                          }
                        />
                      </FeatureInput>
                      <RemoveFeatureButton
                        type="button"
                        onClick={() => safetyFeaturesArray.remove(index)}
                        disabled={safetyFeaturesArray.fields.length === 1}
                        aria-label="Remove safety feature"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </RemoveFeatureButton>
                      {errors.safetyFeatures?.[index] && (
                        <ErrorMessage>
                          {errors.safetyFeatures[index].message}
                        </ErrorMessage>
                      )}
                    </FeatureItem>
                  ))}
                </FeaturesList>
              )}

              <AddItemButton
                type="button"
                onClick={() => safetyFeaturesArray.append("")}
              >
                <FontAwesomeIcon icon={faPlus} /> Add Safety Feature
              </AddItemButton>

              <InfoText>
                Safety features include airbags, ABS, ESP, ADAS, etc.
              </InfoText>
            </FormSection>

            <FormDivider />

            <FormSection>
              <FormSectionTitle>
                <FontAwesomeIcon icon={faTools} /> Comfort & Convenience
                Features
              </FormSectionTitle>

              {featuresArray.fields.length === 0 ? (
                <EmptyFeatureMessage>
                  No features added yet. Add features below.
                </EmptyFeatureMessage>
              ) : (
                <FeaturesList>
                  {featuresArray.fields.map((field, index) => (
                    <FeatureItem key={field.id}>
                      <FeatureInput>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="feature-icon"
                        />
                        <Input
                          {...register(`features.${index}`, {
                            required: "Feature is required",
                          })}
                          placeholder="e.g., Climate Control"
                          aria-invalid={
                            errors.features?.[index] ? "true" : "false"
                          }
                        />
                      </FeatureInput>
                      <RemoveFeatureButton
                        type="button"
                        onClick={() => featuresArray.remove(index)}
                        disabled={featuresArray.fields.length === 1}
                        aria-label="Remove feature"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </RemoveFeatureButton>
                      {errors.features?.[index] && (
                        <ErrorMessage>
                          {errors.features[index].message}
                        </ErrorMessage>
                      )}
                    </FeatureItem>
                  ))}
                </FeaturesList>
              )}

              <AddItemButton
                type="button"
                onClick={() => featuresArray.append("")}
              >
                <FontAwesomeIcon icon={faPlus} /> Add Feature
              </AddItemButton>

              <InfoText>
                Include comfort and convenience features, infotainment, and
                technology.
              </InfoText>
            </FormSection>

            <FormDivider />

            <FormSection>
              <FormSectionTitle>
                <FontAwesomeIcon icon={faListUl} /> Pros & Cons
              </FormSectionTitle>

              <ProConContainer>
                <ProsSide>
                  <ProConHeader isPro>
                    <FontAwesomeIcon icon={faThumbsUp} /> Pros
                  </ProConHeader>

                  <ProConList>
                    {prosArray.fields.map((field, index) => (
                      <FeatureItem key={field.id} className="pro-item">
                        <FeatureInput>
                          <FontAwesomeIcon
                            icon={faThumbsUp}
                            className="pro-icon"
                          />
                          <Input
                            {...register(`pros.${index}`, {
                              required: "Pro is required",
                            })}
                            placeholder="e.g., Excellent mileage"
                            aria-invalid={
                              errors.pros?.[index] ? "true" : "false"
                            }
                          />
                        </FeatureInput>
                        <RemoveFeatureButton
                          type="button"
                          onClick={() => prosArray.remove(index)}
                          disabled={prosArray.fields.length === 1}
                          aria-label="Remove pro"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </RemoveFeatureButton>
                        {errors.pros?.[index] && (
                          <ErrorMessage>
                            {errors.pros[index].message}
                          </ErrorMessage>
                        )}
                      </FeatureItem>
                    ))}
                  </ProConList>

                  <AddItemButton
                    type="button"
                    onClick={() => prosArray.append("")}
                    className="pro-button"
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add Pro
                  </AddItemButton>
                </ProsSide>

                <ConsSide>
                  <ProConHeader isCon>
                    <FontAwesomeIcon icon={faThumbsDown} /> Cons
                  </ProConHeader>

                  <ProConList>
                    {consArray.fields.map((field, index) => (
                      <FeatureItem key={field.id} className="con-item">
                        <FeatureInput>
                          <FontAwesomeIcon
                            icon={faThumbsDown}
                            className="con-icon"
                          />
                          <Input
                            {...register(`cons.${index}`, {
                              required: "Con is required",
                            })}
                            placeholder="e.g., Limited boot space"
                            aria-invalid={
                              errors.cons?.[index] ? "true" : "false"
                            }
                          />
                        </FeatureInput>
                        <RemoveFeatureButton
                          type="button"
                          onClick={() => consArray.remove(index)}
                          disabled={consArray.fields.length === 1}
                          aria-label="Remove con"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </RemoveFeatureButton>
                        {errors.cons?.[index] && (
                          <ErrorMessage>
                            {errors.cons[index].message}
                          </ErrorMessage>
                        )}
                      </FeatureItem>
                    ))}
                  </ProConList>

                  <AddItemButton
                    type="button"
                    onClick={() => consArray.append("")}
                    className="con-button"
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add Con
                  </AddItemButton>
                </ConsSide>
              </ProConContainer>

              <InfoText>
                List the key strengths and weaknesses of the car to help users
                make informed decisions.
              </InfoText>
            </FormSection>
          </form>
        </ModalBody>

        <ModalFooter>
          <CancelButton type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </CancelButton>
          <SubmitButton
            type="submit"
            form="features-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </SubmitButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default FeaturesModal;
