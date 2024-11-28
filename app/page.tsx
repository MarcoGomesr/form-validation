"use client"

import { CreateUser } from "@/app/action"
import { Button } from "@/app/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { loginSchema } from "@/lib/zodSchemas"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { useActionState } from "react"

export default function Home() {
  const [lastResult, action] = useActionState(CreateUser, undefined)

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema })
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput"
  })

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4"
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  key={fields.firstName.key}
                  name={fields.firstName.name}
                  defaultValue={fields.firstName.initialValue}
                  id="first-name"
                  placeholder="Max"
                />
                <p className="text-red-500 text-sm">
                  {fields.firstName.errors}
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  key={fields.lastName.key}
                  name={fields.lastName.name}
                  defaultValue={fields.lastName.initialValue}
                  id="last-name"
                  placeholder="Robinson"
                />
                <p className="text-red-500 text-sm">{fields.lastName.errors}</p>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                key={fields.email.key}
                name={fields.email.name}
                defaultValue={fields.email.initialValue}
              />
              <p className="text-red-500 text-sm">{fields.email.errors}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                key={fields.password.key}
                name={fields.password.name}
                defaultValue={fields.password.initialValue}
              />
              <p className="text-red-500 text-sm">{fields.password.errors}</p>
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
