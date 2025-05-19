// CreateCommunityModal.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faImage } from "@fortawesome/free-solid-svg-icons";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalForm,
  FormGroup,
  Input,
  TextArea,
  Button,
  ErrorMessage,
} from "./communityModalStyles";

const CreateCommunityModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>Create New Community</h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </ModalHeader>
        <ModalForm onSubmit={handleSubmit(handleFormSubmit)}>
          <FormGroup>
            <label>Community Name</label>
            <Input
              {...register("name", {
                required: "Community name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              placeholder="Enter community name"
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <label>Description</label>
            <TextArea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters",
                },
              })}
              placeholder="Describe your community"
              rows={4}
            />
            {errors.description && (
              <ErrorMessage>{errors.description.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <label>Community Rules</label>
            <TextArea
              {...register("rules")}
              placeholder="Enter community rules (optional)"
              rows={3}
            />
          </FormGroup>

          <FormGroup>
            <label>
              <FontAwesomeIcon icon={faImage} /> Community Banner
            </label>
            <Input type="file" accept="image/*" {...register("banner")} />
          </FormGroup>

          <Button type="submit" primary>
            Create Community
          </Button>
        </ModalForm>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateCommunityModal;
