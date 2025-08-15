import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(3, "Title is required"),
  paragragh: z.string().min(10, "Content is required with minimum 10 length"),
  imgURL: z.string().url({ message: "Image URL must be valid" }),
});

export { blogSchema };
