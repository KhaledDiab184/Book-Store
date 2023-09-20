import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiClient from "../../services/ApiClient";
import { Category } from "../../types/Books";
import Modal from "../../components/Models/Modal";
import { Button, Group, SimpleGrid, TextInput, Title } from "@mantine/core";

const schema = z.object({
  id: z
    .number({ invalid_type_error: "ID is required" })
    .min(1, { message: "at least 1" }),
  name: z.string().min(2, { message: " Name is required" }),
});
type FormData = z.infer<typeof schema>;

const AddCategory = () => {
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [categories, setCategories] = useState<Category[]>();
  const fetchCategories = () => {
    ApiClient.get("/Category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleAddCategory = (data: FormData) => {
    setIsLoadingAdd(true);

    ApiClient.post("/Category", {
      id: 0,
      name: data.name,
    })
      .then((response) => {
        fetchCategories();
        console.log(response.data);
        toast.success("Added completed");

        setIsLoadingAdd(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data.errors);
        }
        setIsLoadingAdd(false);
      });
  };
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };
  const [categoryId, setCategoryId] = useState(-1);
  const handleModalSubmit = () => {
    setIsLoadingDelete(true);
    ApiClient.delete(`/Category/${categoryId}`)
      .then(() => {
        fetchCategories();
        setIsLoadingDelete(false);
        setShowModal(false);

        toast.success("Category deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        toast.error("Error deleting category. Please try again later.");
      });
  };
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  const [editingCategory, setEditingCategory] = useState("");

  const [editingId, setEditingId] = useState(-1);
  const handleChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingCategory(event.target.value);
  };
  const handleSaveEdit = (NameCategory: string) => {
    const data = categories;
    setCategories(
      categories!.map((el) => {
        if (editingId === el.id) return { ...el, name: editingCategory };
        else return el;
      })
    );
    if (NameCategory === editingCategory) {
      setEditingId(-1);
      console.log("nothing change");
    } else {
      setIsLoadingEdit(true);
      ApiClient.put(`/Category/${editingId}`, {
        name: editingCategory,
      })
        .then((response) => {
          console.log(response.data);
          toast.success("Author edited successfully");
          fetchCategories();
          setIsLoadingEdit(false);
        })
        .catch((error) => {
          setCategories(data);
          setIsLoadingEdit(false);
          console.error("Error editing Author:", error);
          toast.error("Error editing Author. Please try again later.");
        });
      setEditingId(-1);
    }
  };
  return (
    <>
      <div style={{ width: "70%", margin: "auto" }}>
        <form onSubmit={handleSubmit(handleAddCategory)}>
          <Title
            order={2}
            size="h1"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            })}
            weight={900}
            align="center"
          >
            Let's Add Category
          </Title>

          <SimpleGrid
            cols={2}
            mt="xl"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            <TextInput
              label="Category ID :"
              placeholder="Category ID"
              variant="filled"
              type="number"
              {...register("id", { valueAsNumber: true })}
            />
            {errors.id && (
              <span className="text-danger">{errors.id.message}</span>
            )}
            <TextInput
              label="Category Name :"
              placeholder="Category Name"
              variant="filled"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}
          </SimpleGrid>
          <div className="d-grid">
            <Group position="center" mt="xl">
              <Button type="submit" size="md" disabled={isLoadingAdd}>
                {isLoadingAdd ? "Adding Category" : "Add Category"}
              </Button>
            </Group>
          </div>
        </form>
      </div>

      <div style={{ marginTop: "50px" }}>
        <table
          className="table"
          style={{
            marginTop: "50px",
            width: "50%",
            margin: "auto",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(categories) &&
              categories?.map((category) => (
                <tr key={category.id}>
                  <th scope="col">{category.id}</th>
                  {category.id === editingId ? (
                    <>
                      <td>
                        {" "}
                        <input
                          value={editingCategory}
                          onChange={handleChangeEdit}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </td>

                      <td>
                        <button
                          onClick={() => {
                            handleSaveEdit(category.name);
                          }}
                          style={{ display: "initial" }}
                          className="btn btn-success"
                        >
                          {isLoadingEdit ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm"
                                aria-hidden="true"
                              ></span>
                              <span role="status">Loading...</span>
                            </>
                          ) : (
                            "Save"
                          )}
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{category.name}</td>

                      <td>
                        <button
                          onClick={() => {
                            setCategoryId(category.id);
                            setShowModal(!showModal);
                          }}
                          className="  btn btn-danger"
                        >
                          Delete
                        </button>
                        <button
                          style={{ marginLeft: "6px" }}
                          onClick={() => {
                            setEditingId(category.id);
                            setEditingCategory(category.name);
                          }}
                          className="btn btn-success  "
                        >
                          Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onClose={handleModalClose}>
        <div className="modal-header">
          <h5 className="modal-title">Deleting Category</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleModalClose}
          ></button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to Delete?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleModalClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleModalSubmit}
            disabled={isLoadingDelete}
          >
            {isLoadingDelete ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading...</span>
              </>
            ) : (
              "Yes, Delete"
            )}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddCategory;
