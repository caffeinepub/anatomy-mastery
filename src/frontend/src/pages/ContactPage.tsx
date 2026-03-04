import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/useQueries";
import {
  BookOpen,
  CheckCircle2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const { mutateAsync, isPending } = useSubmitContact();

  const validate = () => {
    const newErrors: Partial<typeof form> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Please enter a valid email";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      await mutateAsync(form);
      setSubmitted(true);
      toast.success("Message sent successfully!");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-800 to-teal-900 text-white py-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-3 bg-teal-600/30 text-teal-200 border-teal-500/30">
              Get in Touch
            </Badge>
            <h1 className="font-display text-4xl font-bold mb-3">Contact Us</h1>
            <p className="text-teal-100/75 max-w-lg">
              Have a question about anatomy, NEET preparation, or the platform?
              We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-5">
            <h2 className="font-display text-xl font-bold text-foreground">
              We're here to help
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Whether you have questions about content, want to suggest new
              topics, or need clarification on anatomy concepts — reach out to
              us.
            </p>

            <div className="space-y-4 pt-2">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "hello@anatomymastery.edu",
                  color: "text-teal-600 bg-teal-50",
                },
                {
                  icon: BookOpen,
                  label: "Content Requests",
                  value: "Request new body systems or MCQ topics",
                  color: "text-amber-600 bg-amber-50",
                },
                {
                  icon: MessageSquare,
                  label: "Response Time",
                  value: "Usually within 24-48 hours",
                  color: "text-violet-600 bg-violet-50",
                },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="text-sm text-foreground/80 mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-border rounded-2xl p-10 text-center shadow-xs"
                data-ocid="contact.success_state"
              >
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. We'll get back to you within 24-48
                  hours.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", message: "" });
                  }}
                  data-ocid="contact.secondary_button"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-xs"
              >
                <h2 className="font-display text-xl font-bold text-foreground mb-6">
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium flex items-center gap-1.5"
                      >
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }));
                          if (errors.name)
                            setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Dr. Priya Sharma"
                        className={errors.name ? "border-destructive" : ""}
                        data-ocid="contact.input"
                      />
                      {errors.name && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="contact.error_state"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }));
                          if (errors.email)
                            setErrors((prev) => ({
                              ...prev,
                              email: undefined,
                            }));
                        }}
                        placeholder="priya@example.com"
                        className={errors.email ? "border-destructive" : ""}
                        data-ocid="contact.input"
                      />
                      {errors.email && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="contact.error_state"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => {
                        setForm((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }));
                        if (errors.message)
                          setErrors((prev) => ({
                            ...prev,
                            message: undefined,
                          }));
                      }}
                      placeholder="I'd like to ask about..."
                      rows={5}
                      className={errors.message ? "border-destructive" : ""}
                      data-ocid="contact.textarea"
                    />
                    {errors.message && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="contact.error_state"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white gap-2"
                    data-ocid="contact.submit_button"
                  >
                    {isPending ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
