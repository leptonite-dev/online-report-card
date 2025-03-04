"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signin(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const {
    error,
    data: { user },
  } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id);

    revalidatePath("/", "layout");

    if (profile![0].acc_role === "admin") {
      redirect("/admin/dashboard");
    } else {
      redirect("teacher/dashboard");
    }
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const {
    error,
    data: { user },
  } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  if (user) {
    await supabase.from("profiles").insert({
      user_id: user.id,
      acc_role: "teacher",
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    });

    revalidatePath("/", "layout");
    redirect("/");
  }
}
