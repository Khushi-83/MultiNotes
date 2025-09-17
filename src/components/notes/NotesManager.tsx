import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Edit, Trash2, FileText, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesManagerProps {
  user: {
    email: string;
    tenant: string;
    role: string;
  };
  subscription: {
    plan: "Free" | "Pro";
    notesUsed: number;
    notesLimit: number | null;
  };
  onUpgrade?: () => void;
}

export function NotesManager({ user, subscription, onUpgrade }: NotesManagerProps) {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Welcome to SaaS Notes",
      content: "This is your first note in the multi-tenant SaaS application. You can create, edit, and delete notes based on your subscription plan.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const { toast } = useToast();

  const isAtLimit = subscription.plan === "Free" && notes.length >= (subscription.notesLimit || 3);
  const canCreateNote = subscription.plan === "Pro" || !isAtLimit;

  const handleCreateNote = () => {
    if (!canCreateNote) {
      toast({
        title: "Note limit reached",
        description: "Upgrade to Pro for unlimited notes",
        variant: "destructive",
      });
      return;
    }

    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast({
        title: "Invalid note",
        description: "Please provide both title and content",
        variant: "destructive",
      });
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes([note, ...notes]);
    setNewNote({ title: "", content: "" });
    setIsCreating(false);
    
    toast({
      title: "Note created",
      description: "Your note has been successfully created",
    });
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
  };

  const handleUpdateNote = () => {
    if (!editingNote) return;

    setNotes(notes.map(note => 
      note.id === editingNote.id 
        ? { ...editingNote, updatedAt: new Date().toISOString() }
        : note
    ));
    setEditingNote(null);
    
    toast({
      title: "Note updated",
      description: "Your note has been successfully updated",
    });
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    toast({
      title: "Note deleted",
      description: "Your note has been successfully deleted",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">My Notes</h2>
          <p className="text-muted-foreground">
            {subscription.plan === "Free" 
              ? `${notes.length}/${subscription.notesLimit} notes used`
              : `${notes.length} notes • Unlimited`
            }
          </p>
        </div>

        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              disabled={!canCreateNote}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Note title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <Textarea
                placeholder="Note content"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                rows={6}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateNote}>
                  Create Note
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isAtLimit && subscription.plan === "Free" && (
        <Alert className="mb-6 border-warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>You've reached your note limit. Upgrade to Pro for unlimited notes.</span>
            {user.role === "Admin" && onUpgrade && (
              <Button size="sm" onClick={onUpgrade} className="ml-4">
                Upgrade Now
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-1">{note.title}</CardTitle>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditNote(note)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3 mb-3">{note.content}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
                {note.updatedAt !== note.createdAt && (
                  <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {notes.length === 0 && (
          <div className="col-span-full text-center py-12">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No notes yet</h3>
            <p className="text-muted-foreground mb-4">Create your first note to get started</p>
            {canCreateNote && (
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Note
              </Button>
            )}
          </div>
        )}
      </div>

      <Dialog open={!!editingNote} onOpenChange={() => setEditingNote(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          {editingNote && (
            <div className="space-y-4">
              <Input
                value={editingNote.title}
                onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
              />
              <Textarea
                value={editingNote.content}
                onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                rows={6}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingNote(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateNote}>
                  Update Note
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}