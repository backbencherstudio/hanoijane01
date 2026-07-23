"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff, PenLine, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import "react-international-phone/style.css";
import PhoneInput from "@/components/phone-input/PhoneInput";

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  contactPhone: string;
  companyPhone: string;
  website: string;
  password: string;
  bio: string;
}

const defaultValues: ProfileFormData = {
  firstName: "Jacob",
  lastName: "Jones",
  companyName: "The Walt Disney Company",
  email: "jacob@gmail.com",
  contactPhone: "+35345888883",
  companyPhone: "+35345888883",
  website: "https://",
  password: "12345678",
  bio: "",
};

export default function PersonalInformationForm() {
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, reset, control } = useForm<ProfileFormData>({
    defaultValues,
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
    setEditing(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-primary">
            {" "}
            <h2 className="text-3xl  font-semibold">Company Details</h2>
            <div>
              {!editing ? (
                <PenLine
                  onClick={() => setEditing(true)}
                  className="cursor-pointer"
                />
              ) : (
                <Save className="cursor-pointer" />
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your company details.
          </p>
        </div>

        {!editing ? (
          <Button
            className="h-10"
            type="button"
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              className="h-10"
              type="button"
              variant="outline"
              onClick={() => {
                reset(defaultValues);
                setEditing(false);
              }}
            >
              Cancel
            </Button>
            <Button className="h-10" type="submit">
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="First Name">
          <Input
            disabled={!editing}
            className="mt-2"
            {...register("firstName")}
          />
        </Field>
        <Field label="Last Name">
          <Input
            disabled={!editing}
            className="mt-2"
            {...register("lastName")}
          />
        </Field>
        <Field label="Company Name">
          <Input
            disabled={!editing}
            className="mt-2"
            {...register("companyName")}
          />
        </Field>
        <Field label="Email Address">
          <Input disabled={!editing} className="mt-2" {...register("email")} />
        </Field>

        <Field label="Contact Phone Number">
          <Controller
            control={control}
            name="contactPhone"
            render={({ field }) => (
              <PhoneInput
                value={field.value}
                onChange={field.onChange}
                disabled={!editing}
                className="mt-2"
                placeholder="Enter contact phone number"
              />
            )}
          />
        </Field>

        <Field label="Company Phone Number">
          <Controller
            control={control}
            name="companyPhone"
            render={({ field }) => (
              <PhoneInput
                value={field.value}
                onChange={field.onChange}
                disabled={!editing}
                className="mt-2"
                placeholder="Enter company phone number"
              />
            )}
          />
        </Field>

        <Field label="Company Website Link">
          <Input
            className="mt-2"
            disabled={!editing}
            {...register("website")}
          />
        </Field>

        <Field label="Password">
          <div className="relative">
            <Input
              disabled={!editing}
              className="mt-2"
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/3"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </Field>
      </div>

      <Field label="Company Bio">
        <Textarea
          className="mt-2"
          rows={6}
          disabled={!editing}
          placeholder="Write something about your company..."
          {...register("bio")}
        />
      </Field>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="font-medium">{label}</label>
      {children}
    </div>
  );
}
