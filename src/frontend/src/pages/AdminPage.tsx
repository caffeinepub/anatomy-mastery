import type { BlogPost, BodySystem, Contact, MCQ } from "@/backend.d.ts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useCreateBlogPost,
  useCreateBodySystem,
  useCreateMCQ,
  useDeleteBlogPost,
  useDeleteBodySystem,
  useDeleteMCQ,
  useGetAllBlogPosts,
  useGetAllBodySystems,
  useGetAllContacts,
  useGetAllMCQs,
  useIsCallerAdmin,
  useUpdateBlogPost,
  useUpdateBodySystem,
  useUpdateMCQ,
} from "@/hooks/useQueries";
import {
  BookOpen,
  Brain,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LogIn,
  MessageSquare,
  Pencil,
  Plus,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ============ Types for forms ============

type BodySystemForm = {
  name: string;
  slug: string;
  description: string;
  structureText: string;
  functionText: string;
  neetPoints: string;
  commonDisorders: string;
  diagramUrl: string;
};

type MCQForm = {
  systemId: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  explanation: string;
};

type BlogPostForm = {
  title: string;
  slug: string;
  content: string;
  author: string;
  isPublished: boolean;
};

// ============ Body Systems CRUD ============

function BodySystemsTab() {
  const { data: systems, isLoading } = useGetAllBodySystems();
  const createMutation = useCreateBodySystem();
  const updateMutation = useUpdateBodySystem();
  const deleteMutation = useDeleteBodySystem();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<BodySystem | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [form, setForm] = useState<BodySystemForm>({
    name: "",
    slug: "",
    description: "",
    structureText: "",
    functionText: "",
    neetPoints: "",
    commonDisorders: "",
    diagramUrl: "",
  });

  const openCreate = () => {
    setEditItem(null);
    setForm({
      name: "",
      slug: "",
      description: "",
      structureText: "",
      functionText: "",
      neetPoints: "",
      commonDisorders: "",
      diagramUrl: "",
    });
    setDialogOpen(true);
  };

  const openEdit = (item: BodySystem) => {
    setEditItem(item);
    setForm({
      name: item.name,
      slug: item.slug,
      description: item.description,
      structureText: item.structureText,
      functionText: item.functionText,
      neetPoints: item.neetPoints,
      commonDisorders: item.commonDisorders,
      diagramUrl: item.diagramUrl ?? "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) {
      toast.error("Name and slug are required");
      return;
    }
    try {
      if (editItem) {
        await updateMutation.mutateAsync({
          id: editItem.id,
          ...form,
          diagramUrl: form.diagramUrl || null,
        });
        toast.success("Body system updated");
      } else {
        await createMutation.mutateAsync({
          ...form,
          diagramUrl: form.diagramUrl || null,
        });
        toast.success("Body system created");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success("Body system deleted");
      setDeleteId(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-lg text-foreground">
          Body Systems
        </h2>
        <Button
          size="sm"
          onClick={openCreate}
          className="bg-teal-700 hover:bg-teal-800 gap-1.5"
          data-ocid="admin.primary_button"
        >
          <Plus className="w-4 h-4" /> Add System
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-48 rounded-xl" data-ocid="admin.loading_state" />
      ) : (
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <Table data-ocid="admin.table">
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Slug</TableHead>
                <TableHead className="font-semibold hidden md:table-cell">
                  Description
                </TableHead>
                <TableHead className="font-semibold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systems?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground py-10"
                    data-ocid="admin.empty_state"
                  >
                    No body systems yet
                  </TableCell>
                </TableRow>
              ) : (
                systems?.map((s, i) => (
                  <TableRow key={String(s.id)} data-ocid={`admin.row.${i + 1}`}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm font-mono">
                      {s.slug}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm max-w-xs truncate">
                      {s.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(s)}
                          data-ocid="admin.edit_button"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(s.id)}
                          className="text-destructive hover:text-destructive"
                          data-ocid="admin.delete_button"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {editItem ? "Edit Body System" : "Add Body System"}
            </DialogTitle>
            <DialogDescription>
              Fill in all the details for this body system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Skeletal System"
                  data-ocid="admin.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Slug</Label>
                <Input
                  value={form.slug}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, slug: e.target.value }))
                  }
                  placeholder="skeletal-system"
                  data-ocid="admin.input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={2}
                data-ocid="admin.textarea"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Structure Text</Label>
              <Textarea
                value={form.structureText}
                onChange={(e) =>
                  setForm((p) => ({ ...p, structureText: e.target.value }))
                }
                rows={3}
                data-ocid="admin.textarea"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Function Text</Label>
              <Textarea
                value={form.functionText}
                onChange={(e) =>
                  setForm((p) => ({ ...p, functionText: e.target.value }))
                }
                rows={3}
                data-ocid="admin.textarea"
              />
            </div>
            <div className="space-y-1.5">
              <Label>NEET Points</Label>
              <Textarea
                value={form.neetPoints}
                onChange={(e) =>
                  setForm((p) => ({ ...p, neetPoints: e.target.value }))
                }
                rows={3}
                data-ocid="admin.textarea"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Common Disorders</Label>
              <Textarea
                value={form.commonDisorders}
                onChange={(e) =>
                  setForm((p) => ({ ...p, commonDisorders: e.target.value }))
                }
                rows={2}
                data-ocid="admin.textarea"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Diagram URL (optional)</Label>
              <Input
                value={form.diagramUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, diagramUrl: e.target.value }))
                }
                placeholder="/assets/generated/diagram.jpg"
                data-ocid="admin.input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending}
              className="bg-teal-700 hover:bg-teal-800"
              data-ocid="admin.save_button"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editItem ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent data-ocid="admin.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Body System?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The system and its MCQs may be
              affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
              data-ocid="admin.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ============ MCQs CRUD ============

function MCQsTab() {
  const { data: systems } = useGetAllBodySystems();
  const { data: mcqs, isLoading } = useGetAllMCQs();
  const createMutation = useCreateMCQ();
  const updateMutation = useUpdateMCQ();
  const deleteMutation = useDeleteMCQ();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<MCQ | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [form, setForm] = useState<MCQForm>({
    systemId: "",
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctOption: "A",
    explanation: "",
  });

  const openCreate = () => {
    setEditItem(null);
    setForm({
      systemId: systems?.[0] ? String(systems[0].id) : "",
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctOption: "A",
      explanation: "",
    });
    setDialogOpen(true);
  };

  const openEdit = (item: MCQ) => {
    setEditItem(item);
    setForm({
      systemId: String(item.systemId),
      question: item.question,
      optionA: item.optionA,
      optionB: item.optionB,
      optionC: item.optionC,
      optionD: item.optionD,
      correctOption: item.correctOption,
      explanation: item.explanation,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.question || !form.systemId) {
      toast.error("Question and system are required");
      return;
    }
    try {
      const systemId = BigInt(form.systemId);
      if (editItem) {
        await updateMutation.mutateAsync({
          id: editItem.id,
          systemId,
          question: form.question,
          optionA: form.optionA,
          optionB: form.optionB,
          optionC: form.optionC,
          optionD: form.optionD,
          correctOption: form.correctOption,
          explanation: form.explanation,
        });
        toast.success("MCQ updated");
      } else {
        await createMutation.mutateAsync({
          systemId,
          question: form.question,
          optionA: form.optionA,
          optionB: form.optionB,
          optionC: form.optionC,
          optionD: form.optionD,
          correctOption: form.correctOption,
          explanation: form.explanation,
        });
        toast.success("MCQ created");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success("MCQ deleted");
      setDeleteId(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  const getSystemName = (systemId: bigint) =>
    systems?.find((s) => s.id === systemId)?.name ?? "Unknown";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-lg text-foreground">MCQs</h2>
        <Button
          size="sm"
          onClick={openCreate}
          className="bg-teal-700 hover:bg-teal-800 gap-1.5"
          data-ocid="admin.primary_button"
        >
          <Plus className="w-4 h-4" /> Add MCQ
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-48 rounded-xl" data-ocid="admin.loading_state" />
      ) : (
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <Table data-ocid="admin.table">
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="font-semibold">Question</TableHead>
                <TableHead className="font-semibold hidden md:table-cell">
                  System
                </TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">
                  Answer
                </TableHead>
                <TableHead className="font-semibold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mcqs?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground py-10"
                    data-ocid="admin.empty_state"
                  >
                    No MCQs yet
                  </TableCell>
                </TableRow>
              ) : (
                mcqs?.map((m, i) => (
                  <TableRow key={String(m.id)} data-ocid={`admin.row.${i + 1}`}>
                    <TableCell className="font-medium max-w-xs truncate text-sm">
                      {m.question}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="secondary" className="text-xs">
                        {getSystemName(m.systemId)}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="bg-green-50 text-green-700 border-green-200">
                        {m.correctOption}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(m)}
                          data-ocid="admin.edit_button"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(m.id)}
                          className="text-destructive hover:text-destructive"
                          data-ocid="admin.delete_button"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {editItem ? "Edit MCQ" : "Add MCQ"}
            </DialogTitle>
            <DialogDescription>
              Create a multiple-choice question for a body system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Body System</Label>
              <Select
                value={form.systemId}
                onValueChange={(v) => setForm((p) => ({ ...p, systemId: v }))}
              >
                <SelectTrigger data-ocid="admin.select">
                  <SelectValue placeholder="Select system" />
                </SelectTrigger>
                <SelectContent>
                  {systems?.map((s) => (
                    <SelectItem key={String(s.id)} value={String(s.id)}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Question</Label>
              <Textarea
                value={form.question}
                onChange={(e) =>
                  setForm((p) => ({ ...p, question: e.target.value }))
                }
                rows={2}
                data-ocid="admin.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(["A", "B", "C", "D"] as const).map((opt) => (
                <div key={opt} className="space-y-1.5">
                  <Label>Option {opt}</Label>
                  <Input
                    value={form[`option${opt}` as keyof MCQForm] as string}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        [`option${opt}`]: e.target.value,
                      }))
                    }
                    data-ocid="admin.input"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <Label>Correct Answer</Label>
              <Select
                value={form.correctOption}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, correctOption: v }))
                }
              >
                <SelectTrigger data-ocid="admin.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["A", "B", "C", "D"].map((o) => (
                    <SelectItem key={o} value={o}>
                      Option {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Explanation</Label>
              <Textarea
                value={form.explanation}
                onChange={(e) =>
                  setForm((p) => ({ ...p, explanation: e.target.value }))
                }
                rows={3}
                data-ocid="admin.textarea"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending}
              className="bg-teal-700 hover:bg-teal-800"
              data-ocid="admin.save_button"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editItem ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent data-ocid="admin.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete MCQ?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
              data-ocid="admin.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ============ Blog Posts CRUD ============

function BlogPostsTab() {
  const { data: posts, isLoading } = useGetAllBlogPosts();
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();
  const deleteMutation = useDeleteBlogPost();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<BlogPost | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [form, setForm] = useState<BlogPostForm>({
    title: "",
    slug: "",
    content: "",
    author: "",
    isPublished: false,
  });

  const openCreate = () => {
    setEditItem(null);
    setForm({
      title: "",
      slug: "",
      content: "",
      author: "",
      isPublished: false,
    });
    setDialogOpen(true);
  };

  const openEdit = (item: BlogPost) => {
    setEditItem(item);
    setForm({
      title: item.title,
      slug: item.slug,
      content: item.content,
      author: item.author,
      isPublished: item.isPublished,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast.error("Title and slug are required");
      return;
    }
    try {
      if (editItem) {
        await updateMutation.mutateAsync({ id: editItem.id, ...form });
        toast.success("Blog post updated");
      } else {
        await createMutation.mutateAsync(form);
        toast.success("Blog post created");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      await updateMutation.mutateAsync({
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        author: post.author,
        isPublished: !post.isPublished,
      });
      toast.success(post.isPublished ? "Post unpublished" : "Post published");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success("Blog post deleted");
      setDeleteId(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-lg text-foreground">
          Blog Posts
        </h2>
        <Button
          size="sm"
          onClick={openCreate}
          className="bg-teal-700 hover:bg-teal-800 gap-1.5"
          data-ocid="admin.primary_button"
        >
          <Plus className="w-4 h-4" /> New Post
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-48 rounded-xl" data-ocid="admin.loading_state" />
      ) : (
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <Table data-ocid="admin.table">
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">
                  Author
                </TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground py-10"
                    data-ocid="admin.empty_state"
                  >
                    No blog posts yet
                  </TableCell>
                </TableRow>
              ) : (
                posts?.map((p, i) => (
                  <TableRow key={String(p.id)} data-ocid={`admin.row.${i + 1}`}>
                    <TableCell className="font-medium max-w-xs truncate text-sm">
                      {p.title}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                      {p.author}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          p.isPublished
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {p.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTogglePublish(p)}
                          title={p.isPublished ? "Unpublish" : "Publish"}
                          data-ocid="admin.toggle"
                        >
                          {p.isPublished ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(p)}
                          data-ocid="admin.edit_button"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(p.id)}
                          className="text-destructive hover:text-destructive"
                          data-ocid="admin.delete_button"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {editItem ? "Edit Blog Post" : "New Blog Post"}
            </DialogTitle>
            <DialogDescription>
              Write a blog article for NEET students.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  data-ocid="admin.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Slug</Label>
                <Input
                  value={form.slug}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, slug: e.target.value }))
                  }
                  data-ocid="admin.input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Author</Label>
              <Input
                value={form.author}
                onChange={(e) =>
                  setForm((p) => ({ ...p, author: e.target.value }))
                }
                placeholder="Dr. Priya Sharma"
                data-ocid="admin.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Content (Markdown)</Label>
              <Textarea
                value={form.content}
                onChange={(e) =>
                  setForm((p) => ({ ...p, content: e.target.value }))
                }
                rows={10}
                className="font-mono text-sm"
                data-ocid="admin.textarea"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.isPublished}
                onCheckedChange={(v) =>
                  setForm((p) => ({ ...p, isPublished: v }))
                }
                data-ocid="admin.switch"
              />
              <Label>{form.isPublished ? "Published" : "Draft"}</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending}
              className="bg-teal-700 hover:bg-teal-800"
              data-ocid="admin.save_button"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editItem ? "Save Changes" : "Create Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent data-ocid="admin.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
              data-ocid="admin.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ============ Contacts View ============

function ContactsTab() {
  const { data: contacts, isLoading } = useGetAllContacts();

  function formatDate(nanoseconds: bigint) {
    const ms = Number(nanoseconds) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display font-bold text-lg text-foreground">
        Contact Submissions
      </h2>

      {isLoading ? (
        <Skeleton className="h-48 rounded-xl" data-ocid="admin.loading_state" />
      ) : (
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <Table data-ocid="admin.table">
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold hidden md:table-cell">
                  Message
                </TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground py-10"
                    data-ocid="admin.empty_state"
                  >
                    No contact submissions yet
                  </TableCell>
                </TableRow>
              ) : (
                contacts?.map((c, i) => (
                  <TableRow key={String(c.id)} data-ocid={`admin.row.${i + 1}`}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {c.email}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm max-w-xs truncate">
                      {c.message}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                      {formatDate(c.submittedAt)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ============ Main Admin Page ============

export function AdminPage() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { identity, login, loginStatus } = useInternetIdentity();
  const isLoggingIn = loginStatus === "logging-in";

  if (adminLoading) {
    return (
      <main
        className="container mx-auto px-4 py-16 max-w-2xl text-center"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="w-10 h-10 animate-spin text-teal-600 mx-auto mb-3" />
        <p className="text-muted-foreground">Checking permissions...</p>
      </main>
    );
  }

  if (!identity) {
    return (
      <main className="container mx-auto px-4 py-20 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-border rounded-2xl p-8 text-center shadow-xs"
          data-ocid="admin.panel"
        >
          <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mx-auto mb-5">
            <Shield className="w-8 h-8 text-teal-700" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Admin Panel
          </h1>
          <p className="text-muted-foreground mb-6 text-sm">
            Sign in with your identity to access the admin panel.
          </p>
          <Button
            onClick={() => login()}
            disabled={isLoggingIn}
            className="w-full bg-teal-700 hover:bg-teal-800 gap-2"
            data-ocid="admin.primary_button"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Signing In...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" /> Sign In
              </>
            )}
          </Button>
        </motion.div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main
        className="container mx-auto px-4 py-20 max-w-md text-center"
        data-ocid="admin.error_state"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-5">
          <Shield className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Access Denied
        </h2>
        <p className="text-muted-foreground text-sm">
          You don't have admin permissions for this application.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-teal-600/40 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-display text-3xl font-bold">Admin Panel</h1>
          </div>
          <p className="text-teal-100/70 text-sm">
            Manage body systems, MCQs, blog posts, and contact submissions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="systems" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-lg bg-white border border-border shadow-xs p-1 rounded-xl h-auto">
            {[
              { value: "systems", label: "Systems", icon: Brain },
              { value: "mcqs", label: "MCQs", icon: CheckCircle2 },
              { value: "blog", label: "Blog", icon: BookOpen },
              { value: "contacts", label: "Contacts", icon: MessageSquare },
            ].map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex items-center gap-1.5 text-sm data-[state=active]:bg-teal-700 data-[state=active]:text-white rounded-lg"
                data-ocid="admin.tab"
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="systems">
            <BodySystemsTab />
          </TabsContent>
          <TabsContent value="mcqs">
            <MCQsTab />
          </TabsContent>
          <TabsContent value="blog">
            <BlogPostsTab />
          </TabsContent>
          <TabsContent value="contacts">
            <ContactsTab />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
