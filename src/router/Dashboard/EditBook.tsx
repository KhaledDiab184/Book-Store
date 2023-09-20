import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Author, Category } from "../../types/Book";
import ApiClient from "../../services/ApiClient";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Button,
  Group,
  SimpleGrid,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const schema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  price: z
    .number({ invalid_type_error: "Price is required" })
    .min(1, { message: "At least 1 dollar" }),
  imageFile: z
    .instanceof(FileList)

    .refine(
      (files) => (files[0] == null ? true : files?.[0]?.size <= MAX_FILE_SIZE),
      `Max file size is 5MB.`
    )
    .refine(
      (files) =>
        files[0] == null
          ? true
          : ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .optional(),
  about: z.string().nonempty({message:"About is required"}),
  publishYear: z.number().min(4, { message: "PublishYear is required" }),
  pageCount: z.number().min(1),
  CategoryId: z.string().trim().nonempty({ message: "Category is required" }),
  AuthorId: z.string().nonempty({ message: "Author is required" }),
});

type FormData = z.infer<typeof schema>;

const EditBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>();
  const [authors, setAuthors] = useState<Author[]>();
  const { bookId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    ApiClient.get(`/Book/${bookId}`)
      .then(({ data }) => {
        setValue("name", data.name);
        setValue("price", data.price);
        setValue("about", data.about);
        setValue("publishYear", data.publishYear);
        setValue("pageCount", data.pageCount);

        setValue("CategoryId", data.category.id);
        setValue("AuthorId", data.author.id);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
    ApiClient.get("/Category").then((response) => {
      setCategories(response.data);
    });
    ApiClient.get("/Author").then((response) => {
      setAuthors(response.data);
    });
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });




  const handleEditBook = (data: FormData) => {
    const bookData = new FormData();

    bookData.append("Name", data.name);
    bookData.append("Price", String(data.price));
    if (data.imageFile) bookData.append("ImageFile", data.imageFile[0]);
    bookData.append("About", data.about);
    bookData.append("PublishYear", String(data.publishYear));
    bookData.append("PageCount", String(data.pageCount));
    bookData.append("AuthorId", data.AuthorId);
    bookData.append("PublisherId", "1");
    bookData.append("CategoryId", data.CategoryId);

    setIsLoading(true);
    ApiClient.put(`/Book/${bookId}`, bookData).then(() => {
      setIsLoading(false);
      toast.success("Book has been updated successfully");
      navigate("/Dashboard", { replace: true });
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <Title
            order={2}
            size="h1"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            })}
            weight={900}
            align="center"
          >
            Let's Edit Book
          </Title>
          <form onSubmit={handleSubmit(handleEditBook)}>
            <SimpleGrid
              cols={2}
              mt="xl"
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
              <div>
                <TextInput
                  label="Name"
                  {...register("name")}
                  id="floatingInput"
                  placeholder="Name"
                />

                {errors.name && (
                  <span className="text-danger">{errors.name.message}</span>
                )}
              </div>
              <div>
                <TextInput
                  label="Price :"
                  {...register("price", { valueAsNumber: true })}
                  id="floatingInput"
                  placeholder="price"
                />

                {errors.price && (
                  <span className="text-danger">{errors.price.message}</span>
                )}
              </div>
            </SimpleGrid>

            <div>
              <Textarea
                label="About"
                {...register("about")}
                id="about"
                placeholder="about"
                rows={5}
              />

              {errors.about && (
                <span className="text-danger">{errors.about.message}</span>
              )}
            </div>
            <div>
              <TextInput
                label="PublishYear"
                {...register("publishYear", { valueAsNumber: true })}
                type="text"
                id="publishYear"
                placeholder="Example  1960"
              />
              {errors.publishYear && (
                <span className="text-danger">
                  {errors.publishYear.message}
                </span>
              )}
            </div>
            <div>
              <TextInput
                label="PageCount"
                {...register("pageCount", { valueAsNumber: true })}
                type="text"
                id="pageCount"
                placeholder="pageCount "
              />
              {errors.pageCount && (
                <span className="text-danger">{errors.pageCount.message}</span>
              )}
            </div>
            {errors.CategoryId && (
              <span className="text-danger">{errors.CategoryId.message}</span>
            )}

            <SimpleGrid
              cols={2}
              mt="xl"
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
              <div className="">
                <label className="select-label" htmlFor="CategoryId">
                  Category :
                </label>
                <select className="select" {...register("CategoryId")}>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <label className="select-label" htmlFor="AuthorId">
                  Author :
                </label>
                <select className="select" {...register("AuthorId")}>
                  {authors?.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>
            </SimpleGrid>
            <div>
              <TextInput
                label="Image :"
                {...register("imageFile")}
                type="file"
                id="inputGroupFile01"
              />
            </div>
            {errors.imageFile && (
              <p className="text-danger">{errors.imageFile.message}</p>
            )}

            <Group position="center" mt="xl">
              <Button type="submit" size="md" disabled={isLoading}>
                {isLoading ? "Editing Book" : "Edit Book"}
              </Button>
            </Group>
          </form>
        </div>
      </div>
      {/* <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto ">
            <div className="card border-0 shadow rounded-3 my-3 mt-">
              <div className="card-body p-4 p-sm-5 ">
                <h2 className="card-title text-center mb-5 fw-light  fs-2">
                  Edit Book
                </h2>
                <form onSubmit={handleSubmit(handleEditBook)}>
                  <div className="form-floating mb-3">
                    <input
                      {...register("name")}
                      className="form-control"
                      id="floatingInput"
                      placeholder="Name"
                    />
                    <label htmlFor="floatingInput"> Name</label>
                    {errors.name && (
                      <span className="text-danger">{errors.name.message}</span>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      {...register("price", { valueAsNumber: true })}
                      className="form-control"
                      id="floatingInput"
                      placeholder="price"
                    />
                    <label htmlFor="floatingInput">price</label>
                    {errors.price && (
                      <span className="text-danger">
                        {errors.price.message}
                      </span>
                    )}
                  </div>

                  <div className="input-group mb-3">
                    <input
                      {...register("imageFile")}
                      type="file"
                      className="form-control"
                      id="inputGroupFile01"
                    />
                  </div>
                  {errors.imageFile && (
                    <p className="text-danger">{errors.imageFile.message}</p>
                  )}
                  <div className="form-floating mb-3">
                    <textarea
                      {...register("about")}
                      className="form-control"
                      id="about"
                      placeholder="about"
                      rows={5}
                    />
                    <label htmlFor="about">about</label>
                    {errors.about && (
                      <span className="text-danger">
                        {errors.about.message}
                      </span>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      {...register("publishYear", { valueAsNumber: true })}
                      type="text"
                      className="form-control"
                      id="publishYear"
                      placeholder="Example  1960"
                    />
                    <label htmlFor="publishYear">publishYear</label>
                    {errors.publishYear && (
                      <span className="text-danger">
                        {errors.publishYear.message}
                      </span>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      {...register("pageCount", { valueAsNumber: true })}
                      type="text"
                      className="form-control"
                      id="pageCount"
                      placeholder="pageCount "
                    />
                    <label htmlFor="publishYear">pageCount</label>
                    {errors.pageCount && (
                      <span className="text-danger">
                        {errors.pageCount.message}
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="CategoryId">Category </label>
                    <select
                      className="form-control"
                      {...register("CategoryId")}
                    >
                      {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className=" mb-4">
                    <label htmlFor="AuthorId">Author </label>
                    <select className="form-control" {...register("AuthorId")}>
                      {authors?.map((author) => (
                        <option key={author.id} value={author.id}>
                          {author.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-login fw-bold"
                    >
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            aria-hidden="true"
                          ></span>
                          <span className="ms-2" role="status">
                            Adding ...
                          </span>
                        </>
                      ) : (
                        "Save Edit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default EditBook;
