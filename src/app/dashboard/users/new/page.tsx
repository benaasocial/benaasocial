"use client";

import * as React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useCreateUser from "@/hooks/useCreateUser";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, userSchema } from "@/validation/validation";
import Link from "next/link";
import { toastFlow } from "@/lib/toast";
import { getErrorMessage } from "@/lib/getErrorMessage";

/**
 * Create user page
 */
export default function CreateUser() {
    const router = useRouter();

    /**
     * Toggle password visibility
     */
    const [showPass, setShowPass] = React.useState(false);

    /**
     * Form setup
     */
    const form = useForm<User>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            role: "user",
        },
        resolver: zodResolver(userSchema),
        mode: "onChange"
    });

    /**
     * Create user mutation
     */
    const mutation = useCreateUser();

    /**
     * Handle form submit
     */
    const onSubmit: SubmitHandler<User> = (values) => {
        mutation.mutate(
            { data: values },
            {
                onSuccess: (data) => {
                    toastFlow.success(data.message as string);

                    // reset form after success
                    form.reset({
                        username: "",
                        email: "",
                        password: "",
                        role: "user",
                    });

                    // go back to users page
                    router.push("/dashboard/users");
                },
                onError: (error) => {
                    const err = getErrorMessage(error);

                    toastFlow.error("Failed to create user", {
                        className: "destructive",
                        description: err || "Something went wrong.",
                    });
                },
            }
        );
    };

    return (
        <main className="max-w-3xl mx-auto p-4 md:p-6">

            {/* Page header */}
            <div className="mb-6">
                <h1 className="text-xl font-semibold">Create user</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Create a new account. The user will be able to login and create posts.
                </p>
            </div>

            {/* Optional inline error */}
            {mutation.isError && (
                <Alert variant="destructive" className="mb-4">
                    <AlertDescription>
                        {(mutation.error)?.response?.data?.message || "Failed to create user"}
                    </AlertDescription>
                </Alert>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* Username field */}
                <div className="space-y-2">
                    <Label htmlFor="username">Name</Label>
                    <Controller
                        control={form.control}
                        name="username"
                        render={({ field, fieldState }) => (
                            <>
                                <Input id="username" placeholder="Enter full name" {...field} />
                                {fieldState.error && (
                                    <p className="text-sm text-red-600">{fieldState.error.message}</p>
                                )}
                            </>
                        )}
                    />
                </div>

                {/* Email field */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Controller
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <>
                                <Input id="email" type="email" placeholder="name@company.com" {...field} />
                                {fieldState.error && (
                                    <p className="text-sm text-red-600">{fieldState.error.message}</p>
                                )}
                            </>
                        )}
                    />
                </div>

                {/* Password field */}
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Controller
                        control={form.control}
                        name="password"
                        render={({ field, fieldState }) => (
                            <>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPass ? "text" : "password"}
                                        placeholder="Enter password"
                                        {...field}
                                        className="pr-10"
                                    />

                                    {/* Show / hide password button */}
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted"
                                        onClick={() => setShowPass((s) => !s)}
                                        aria-label="Toggle password"
                                    >
                                        {showPass ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>

                                {fieldState.error && (
                                    <p className="text-sm text-red-600">{fieldState.error.message}</p>
                                )}
                            </>
                        )}
                    />
                </div>

                {/* Role field */}
                <div className="space-y-2">
                    <Label>Role</Label>
                    <Controller
                        control={form.control}
                        name="role"
                        rules={{ required: "Role is required" }}
                        render={({ field, fieldState }) => (
                            <>
                                <Select
                                    value={field.value}
                                    onValueChange={(v) => field.onChange(v as User["role"])}
                                >
                                    <SelectTrigger className="w-full max-w-sm">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Role</SelectLabel>
                                            <SelectItem value="owner">Owner</SelectItem>
                                            <SelectItem value="user">User</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                {fieldState.error && (
                                    <p className="text-sm text-red-600">{fieldState.error.message}</p>
                                )}

                                <p className="text-xs text-muted-foreground">
                                    <b>Owner</b> can manage users. <b>User</b> can create posts only.
                                </p>
                            </>
                        )}
                    />
                </div>

                {/* Form actions */}
                <div className="flex items-center gap-2 pt-2">
                    <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="gap-2"
                    >
                        {mutation.isPending ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <UserPlus className="h-4 w-4" />
                                Create user
                            </>
                        )}
                    </Button>

                    <Link
                        href={`/dashboard/users`}
                        className="border border-gray-300 px-4 py-1 rounded-sm"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </main>
    );
}