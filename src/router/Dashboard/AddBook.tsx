import "../../index.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiClient from "../../services/ApiClient";
import { Author, Category } from "../../types/Books";
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
  name: z.string().min(2, { message: " Name is required" }),
  price: z
    .number({ invalid_type_error: "Price is required" })
    .min(1, { message: "at least 1 dollar" }),

  imageFile: z
    .instanceof(FileList)
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  about: z.string().min(30),
  publishYear: z.number().min(4, { message: "publishYear is required " }),
  pageCount: z.number().min(1),
  CategoryId: z.string().trim().nonempty({ message: "Category is required" }),
  AuthorId: z.string().nonempty({ message: "Author is required" }),
});
type FormData = z.infer<typeof schema>;

const AddBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>();
  const [authors, setAuthors] = useState<Author[]>();

  useEffect(() => {
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

    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleAddBook = (data: FormData) => {
    // Axios Call

    setIsLoading(true);
    const bookData = new FormData();

    bookData.append("Name", data.name);
    bookData.append("Price", String(data.price));
    bookData.append("ImageFile", data.imageFile[0]);
    bookData.append("About", data.about);
    bookData.append("PublishYear", String(data.publishYear));
    bookData.append("PageCount", String(data.pageCount));
    bookData.append("AuthorId", data.AuthorId);
    bookData.append("PublisherId", "1");
    bookData.append("CategoryId", data.CategoryId);
    ApiClient.post("/Book", bookData)
      .then((response) => {
        console.log(response.data);
        toast.success("Added completed");

        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data.errors);
        }
        setIsLoading(false);
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
            Let's Add Book
          </Title>
          <form onSubmit={handleSubmit(handleAddBook)}>
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
                {isLoading ? "Adding Book" : "Add Book"}
              </Button>
            </Group>
          </form>
        </div>
      </div>
      {/* <div style={{ width: "70%", margin: "auto" }}>
        <Title
          order={2}
          size="h1"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          })}
          weight={900}
          align="center"
        >
          Let's Add Book
        </Title>
        <form onSubmit={handleSubmit(handleAddBook)}>
          <SimpleGrid
            cols={2}
            mt="xl"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            <TextInput
              label="Book Name :"
              placeholder="Book Name"
              variant="filled"
              {...register("name")}
              id="name"
            />
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}
            <TextInput
              label="Price :"
              placeholder="Price"
              variant="filled"
              {...register("price", { valueAsNumber: true })}
              id="price"
              type="number"
              step=".01"
            />
            {errors.price && (
              <span className="text-danger">{errors.price.message}</span>
            )}
          </SimpleGrid>

          <Textarea
            label="About :"
            placeholder="About"
            mt="md"
            variant="filled"
            {...register("about")}
            id="about"
            maxRows={10}
            minRows={5}
            autosize
          />
          {errors.about && (
            <span className="text-danger">{errors.about.message}</span>
          )}

          <SimpleGrid
            cols={2}
            mt="xl"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            <TextInput
              label="Publish Year :"
              placeholder="Publish Year"
              mt="md"
              variant="filled"
              {...register("publishYear", { valueAsNumber: true })}
              id="publishyear"
            />
            {errors.publishYear && (
              <span className="text-danger">{errors.publishYear.message}</span>
            )}

            <TextInput
              label="Page Count :"
              placeholder="Page Count"
              mt="md"
              variant="filled"
              {...register("pageCount", { valueAsNumber: true })}
              id="pagecount"
            />
            {errors.pageCount && (
              <span className="text-danger">{errors.pageCount.message}</span>
            )}
          </SimpleGrid>

          <SimpleGrid
            cols={2}
            mt="xl"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            <div className="">
              <label className="select-label">Category :</label>
              <select className="select" {...register("CategoryId")}>
                {categories?.map((category) => (
                  <option key={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            {errors.CategoryId && (
              <span className="text-danger">{errors.CategoryId.message}</span>
            )}
            <div className="">
              <label className="select-label">Author</label>
              <select className="select" {...register("AuthorId")}>
                {authors?.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.AuthorId && (
              <span className="text-danger">{errors.AuthorId.message}</span>
            )}
          </SimpleGrid>

          <TextInput
            label="Image :"
            placeholder="Image"
            accept=""
            type="file"
            mt="md"
            variant="filled"
            {...register("imageFile")}
            id="ImagaFile"
          />
          {errors.imageFile && (
            <span className="text-danger">{errors.imageFile.message}</span>
          )}

          <Group position="center" mt="xl">
            <Button type="submit" size="md" disabled={isLoading}>
              {isLoading ? "Adding Book" : "Add Book"}
            </Button>
          </Group>
        </form>
      </div> */}
    </>
  );
};

export default AddBook;
