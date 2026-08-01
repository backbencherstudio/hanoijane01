"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CircleX, PenLine, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  setEditing,
  resetProfileEdit,
} from "@/src/redux/features/profile/profileEditSlice";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/src/redux/api/auth/authApi";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { toast } from "sonner";
import "react-international-phone/style.css";

export interface ProfileFormData {
  name: string;
  companyName: string;
  companyAddress: string;
  contactPhone: string;
  companyPhone: string;
  website: string;
  bio: string;
}

export default function PersonalInformationForm() {
  const dispatch = useAppDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data: meData } = useGetMeQuery();
  const user = meData?.data;
  const [image, setImage] = useState<File | null>(null);

  const editing = useAppSelector((state) => state.profileEdit.editing);

  const { register, handleSubmit, reset } = useForm<ProfileFormData>();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? "",
        companyName: user.companyName ?? "",
        companyAddress: user.companyAddress ?? "",
        contactPhone: user.phoneNumber ?? "",
        companyPhone: user.companyPhoneNumber ?? "",
        website: user.websiteLink ?? "",
        bio: user.companyBio ?? "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("companyName", data.companyName);
      formData.append("companyAddress", data.companyAddress);
      formData.append("phoneNumber", data.contactPhone);
      formData.append("companyPhoneNumber", data.companyPhone);
      formData.append("websiteLink", data.website);
      formData.append("companyBio", data.bio);

      if (image) {
        formData.append("avatar", image);
      }

      await updateProfile(formData).unwrap();

      toast.success("Profile updated successfully");
      dispatch(resetProfileEdit());
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update profile"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-primary">
            {" "}
            <h2 className="text-2xl lg:text-3xl  font-semibold">Company Details</h2>
            <div>
              {!editing ? (
                <PenLine
                  onClick={() => dispatch(setEditing(true))}
                  className="cursor-pointer"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <button type="submit" disabled={isLoading}>
                    <Save className="cursor-pointer" />
                  </button>
                  <CircleX
                    onClick={() => {
                      if (user) {
                        reset({
                          name: user.name ?? "",
                          companyName: user.companyName ?? "",
                          companyAddress: user.companyAddress ?? "",
                          contactPhone: user.phoneNumber ?? "",
                          companyPhone: user.companyPhoneNumber ?? "",
                          website: user.websiteLink ?? "",
                          bio: user.companyBio ?? "",
                        });
                      }
                      dispatch(resetProfileEdit());
                    }}
                    className="cursor-pointer text-red-500"
                  />
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your company details.
          </p>
        </div>
        <div className="">
          {!editing ? (
            <Button
              className="h-10"
              type="button"
              onClick={() => dispatch(setEditing(true))}
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
                  if (user) {
                    reset({
                      name: user.name ?? "",
                      companyName: user.companyName ?? "",
                      companyAddress: user.companyAddress ?? "",
                      contactPhone: user.phoneNumber ?? "",
                      companyPhone: user.companyPhoneNumber ?? "",
                      website: user.websiteLink ?? "",
                      bio: user.companyBio ?? "",
                    });
                  }
                  dispatch(resetProfileEdit());
                }}
              >
                Cancel
              </Button>
              <Button className="h-10" type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Full Name">
          <Input disabled={!editing} className="mt-2" {...register("name")} />
        </Field>
        <Field label="Company Name">
          <Input
            disabled={!editing}
            className="mt-2"
            {...register("companyName")}
          />
        </Field>
        <Field label="Company Address">
          <Input
            disabled={!editing}
            className="mt-2"
            {...register("companyAddress")}
          />
        </Field>

        <Field label="Contact Phone Number">
          <Input
            type="tel"
            className="mt-2"
            placeholder="Enter contact phone number"
            disabled={!editing}
            {...register("contactPhone")}
          />
        </Field>

        <Field label="Company Phone Number">
          <Input
            type="tel"
            className="mt-2"
            placeholder="Enter company phone number"
            disabled={!editing}
            {...register("companyPhone")}
          />
        </Field>

        <Field label="Company Website Link">
          <Input
            className="mt-2"
            disabled={!editing}
            {...register("website")}
          />
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
