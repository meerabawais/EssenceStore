"use client";

import { useState } from "react";
import BreadCrumb from "@/components/layout/BreadCrumb";

export default function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const response = await fetch("/api/contact_info", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userName: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await response.json();

      console.log("CONTACT RESPONSE:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to send message"
        );
      }

      setSubmitted(true);

      setForm({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {

      console.error("CONTACT ERROR:", error);

      setError(
        error.message || "Something went wrong."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <>
      <BreadCrumb />

      <section className="contact_area section-padding-80">

        <div className="container">

          <div className="row justify-content-center">

            <div className="col-12 col-lg-6">

              <h2 className="mb-4">
                Get in Touch
              </h2>

              {submitted ? (

                <div className="alert alert-success">

                  Thanks for reaching out — we'll
                  get back to you soon.

                </div>

              ) : (

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">

                    <label className="form-label">
                      Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  <div className="mb-3">

                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  <div className="mb-3">

                    <label className="form-label">
                      Message
                    </label>

                    <textarea
                      className="form-control"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {error && (
                    <div className="alert alert-danger">
                      {error}
                    </div>
                  )}


                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >

                    {loading
                      ? "Sending..."
                      : "Send Message"}

                  </button>

                </form>

              )}

            </div>

          </div>

        </div>

      </section>
    </>
  );
}