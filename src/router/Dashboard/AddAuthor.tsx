import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiClient from "../../services/ApiClient";
import { Author } from "../../types/Books";
import Modal from "../../components/Models/Modal";
import { Button, Group, SimpleGrid, TextInput, Title } from "@mantine/core";

const schema = z.object({
  id: z
    .number({ invalid_type_error: "ID is required" })
    .min(1, { message: "at least 1" }),
  name: z.string().min(2, { message: " Name is required" }),
});
type FormData = z.infer<typeof schema>;

const AddAuthor = () => {
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  const [authors, setAuthors] = useState<Author[]>();
  const fetchAuthors = () => {
    ApiClient.get("/Author")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.error("Error ", error);
      });
  };
  useEffect(() => {
    fetchAuthors();
  }, []);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleAddAuthor = (data: FormData) => {
    // Axios Call

    setIsLoadingAdd(true);

    ApiClient.post("/Author", {
      id: 0,
      name: data.name,
    })
      .then((response) => {
        fetchAuthors();
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
  const [AuthorId, setAuthorId] = useState(-1);
  const handleModalSubmit = () => {
    setIsLoadingDelete(true);
    ApiClient.delete(`/Author/${AuthorId}`)
      .then(() => {
        fetchAuthors();
        setIsLoadingDelete(false);
        setShowModal(false);

        toast.success("Author deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting Author:", error);
        toast.error("Error deleting Author. Please try again later.");
      });
  };
  const [editingAuthor, setEditingAuthor] = useState("");

  const [editingId, setEditingId] = useState(-1);
  const handleChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingAuthor(event.target.value);
  };
  const handleSaveEdit = (NameAuthor: string) => {
    const data = authors;
    setAuthors(
      authors!.map((el) => {
        if (editingId === el.id) return { ...el, name: editingAuthor };
        else return el;
      })
    );
    if (NameAuthor === editingAuthor) {
      setEditingId(-1);
      console.log("nothing change");
    } else {
      setIsLoadingEdit(true);
      ApiClient.put(`/Author/${editingId}`, {
        name: editingAuthor,
      })
        .then((response) => {
          console.log(response.data);
          toast.success("edited successfully");
          fetchAuthors();
          setIsLoadingEdit(false);
        })
        .catch((error) => {
          setAuthors(data);
          setIsLoadingEdit(false);
          console.error("Error editing:", error);
          toast.error("Error editing Author. Please try again later.");
        });
      setEditingId(-1);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
              <div style={{ width: "70%", margin: "auto" }}>
                <form onSubmit={handleSubmit(handleAddAuthor)}>
                  <Title
                    order={2}
                    size="h1"
                    sx={(theme) => ({
                      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    })}
                    weight={900}
                    align="center"
                  >
                    Let's Add Author
                  </Title>

                  <SimpleGrid
                    cols={2}
                    mt="xl"
                    breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                  >
                    <TextInput
                      label="Author ID :"
                      placeholder="Author ID"
                      variant="filled"
                      type="number"
                      {...register("id", { valueAsNumber: true })}
                    />
                    {errors.id && (
                      <span className="text-danger">{errors.id.message}</span>
                    )}
                    <TextInput
                      label="Author Name :"
                      placeholder="Author Name"
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
                        {isLoadingAdd ? "Adding Author" : "Add Author"}
                      </Button>
                    </Group>
                  </div>
                </form>
          </div>


          <div style={{marginTop:"50px"}}>
          <table className="table" style={{width:"50%", margin:"auto", textAlign:"center"}}>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Authors</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors?.map((author) => (
                <tr key={author.id}>
                  <th scope="col">{author.id}</th>

                  {author.id === editingId ? (
                    <>
                      <td>
                        {" "}
                        <input
                          value={editingAuthor}
                          onChange={handleChangeEdit}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </td>

                      <td>
                        <button
                          onClick={() => {
                            handleSaveEdit(author.name);
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
                      <td>{author.name}</td>

                      <td>
                        <button
                          onClick={() => {
                            setAuthorId(author.id);
                            setShowModal(!showModal);
                          }}
                          className="  btn btn-danger"
                        >
                          Delete
                        </button>
                        <button
                          style={{ marginLeft: "6px" }}
                          onClick={() => {
                            setEditingId(author.id);
                            setEditingAuthor(author.name);
                          }}
                          className="btn btn-success"
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
        </div>
      </div>
      
      <Modal show={showModal} onClose={handleModalClose}>
        <div className="modal-header">
          <h5 className="modal-title">Deleting Author</h5>
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

export default AddAuthor;
