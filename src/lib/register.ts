"use server";

import { State } from "@/types/types";
import { z } from "zod";
import { auth, post } from "./strapi";

const FormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirm: z.string().min(1, "Confirm password is required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm) {
      ctx.addIssue({
        path: ["confirm"],
        code: z.ZodIssueCode.custom,
        message: "Passwords must match",
      });
    }
  });

export const register = async (prevState: State, formData: FormData) => {
  const validateRegisterData = FormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });

  if (!validateRegisterData.success) {
    return {
      errors: validateRegisterData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create an account.",
    };
  }

  const { firstName, lastName, email, password } = validateRegisterData.data;

  const registerData = {
    email,
    password,
    username: `${firstName} ${lastName}`,
  };

  try {
    // Añadimos el retraso artificial
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Primero creamos usuario
    const registerResponse = await auth("register", registerData);

    if (registerResponse) {
      const { userId, username, email } = registerResponse.user;
      const jwt = registerResponse.jwt;

      const customerData = {
        firstName,
        lastName,
        users_permissions_user: userId,
      };

      // Segundo creamos los datos del cliente
      const customerResponse = await post(`customers-data`, customerData);

      if (customerResponse) {
        return {
          success: true,
          jwt,
          user: {
            username,
            email,
          },
          message: "User and customerData created successfully!",
        };
      } else {
        return { success: false, message: customerResponse.error };
      }
    } else {
      return { success: false, message: registerResponse.error };
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, message: "Something went wrong!" };
  }
};
