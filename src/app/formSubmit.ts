"use server";

import { schema } from "./formSchema";

export type FormStateT = {
  message: string;
  fields: Record<string, string>;
  issues?: string[];
};

export const onSubmitAction = async (
  prevState: FormStateT,
  formData: FormData
) => {
  const data = Object.fromEntries(formData);
  const parsed = await schema.safeParseAsync(data);
  console.log("server form Action", { parsed });

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData.get(key)?.toString()!;
    }
    return {
      message: "Invalid form data!",
      fields,
      issues: parsed.error.issues.map((i) => i.message),
    };
  }

  if (parsed.data.email.includes("a")) {
    return { message: "Invalid email", fields: parsed.data };
  }

  return { message: "User registered" };
};
