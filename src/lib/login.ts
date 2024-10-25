"use server";

import { State } from "@/types/types";
import { z } from "zod";
import { auth } from "./strapi";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export const login = async (prevState: State, formData: FormData) => {
  const validateRegisterData = FormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateRegisterData.success) {
    return {
      errors: validateRegisterData.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validateRegisterData.data;

  const loginData = {
    identifier: email,
    password,
  };

  try {
    // Añadimos el retraso artificial
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Primero creamos usuario
    const loginResponse = await auth("", loginData);

    console.log("loginResponse", loginResponse);

    if (loginResponse) {
      if (loginResponse.error) {
        return {
          message: "Datos incorrectos",
        };
      }
      const jwt = loginResponse.jwt;
      const { username, email } = loginResponse.user;

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
      return { success: false, message: loginResponse.error };
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, message: "Something went wrong!" };
  }
};
