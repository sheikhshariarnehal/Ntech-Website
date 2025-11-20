"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Trash2, Upload } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio: string | null;
  email: string | null;
  phone: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  github_url: string | null;
  image_url: string | null;
  order_position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function EditTeamMemberPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [member, setMember] = useState<TeamMember | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    bio: "",
    email: "",
    phone: "",
    linkedin_url: "",
    twitter_url: "",
    github_url: "",
    image_url: "",
    order_position: 0,
    is_active: true,
  });

  useEffect(() => {
    if (params.id) {
      fetchMember();
    }
  }, [params.id]);

  async function fetchMember() {
    setLoading(true);
    const { data, error } = await supabase
      .from('team')
      .select('*')
      .eq('id', params.id)
      .single();

    if (!error && data) {
      setMember(data);
      setImagePreview(data.image_url || "");
      setFormData({
        name: data.name,
        designation: data.designation,
        bio: data.bio || "",
        email: data.email || "",
        phone: data.phone || "",
        linkedin_url: data.linkedin_url || "",
        twitter_url: data.twitter_url || "",
        github_url: data.github_url || "",
        image_url: data.image_url || "",
        order_position: data.order_position,
        is_active: data.is_active,
      });
    }
    setLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === "order_position") {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    setUploading(true);
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('team-images')
      .upload(filePath, imageFile);

    setUploading(false);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('team-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;

    setSaving(true);

    let imageUrl = formData.image_url;

    // Upload new image if a file was selected
    if (imageFile) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
        
        // Delete old image from storage if it exists and is from our storage
        if (member.image_url && member.image_url.includes('team-images')) {
          const oldPath = member.image_url.split('/team-images/').pop();
          if (oldPath) {
            await supabase.storage.from('team-images').remove([oldPath]);
          }
        }
      } else {
        alert('Failed to upload image. Please try again.');
        setSaving(false);
        return;
      }
    }

    const { error } = await supabase
      .from('team')
      .update({
        ...formData,
        image_url: imageUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', member.id);

    if (!error) {
      router.push('/admin/team');
    } else {
      console.error('Error updating team member:', error);
      alert('Failed to update team member. Please try again.');
    }
    
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!member) return;

    const { error } = await supabase
      .from('team')
      .delete()
      .eq('id', member.id);

    if (!error) {
      router.push('/admin/team');
    } else {
      console.error('Error deleting team member:', error);
      alert('Failed to delete team member. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!member) {
    return (
      <>
        <PageHeader title="Team Member Not Found" subtitle="The requested team member could not be found." />
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">This team member may have been deleted or does not exist.</p>
          <Button asChild>
            <Link href="/admin/team">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Team
            </Link>
          </Button>
        </Card>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <PageHeader 
            title={`Edit: ${member.name}`}
            subtitle="Update team member information"
          />
          <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
            <Link href="/admin/team">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Team
            </Link>
          </Button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="designation">Designation *</Label>
                    <Input
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="Senior Developer"
                      required
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Write a brief bio about the team member..."
                    rows={4}
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+880 1234-567890"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Media Links */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input
                    id="linkedin_url"
                    name="linkedin_url"
                    type="url"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter_url">Twitter URL</Label>
                  <Input
                    id="twitter_url"
                    name="twitter_url"
                    type="url"
                    value={formData.twitter_url}
                    onChange={handleChange}
                    placeholder="https://twitter.com/username"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    name="github_url"
                    type="url"
                    value={formData.github_url}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Image */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Profile Image</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="image_file">Upload Image</Label>
                  <div className="mt-2">
                    <label htmlFor="image_file" className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload image</p>
                          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 5MB</p>
                        </div>
                      )}
                    </label>
                    <input
                      id="image_file"
                      name="image_file"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                  {imageFile && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Selected: {imageFile.name}
                    </p>
                  )}
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    name="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Or paste an external image URL
                  </p>
                </div>
              </div>
            </Card>

            {/* Display Settings */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Display Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="order_position">Display Order</Label>
                  <Input
                    id="order_position"
                    name="order_position"
                    type="number"
                    value={formData.order_position}
                    onChange={handleChange}
                    min="0"
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Lower numbers appear first
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="is_active"
                    name="is_active"
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <Label htmlFor="is_active" className="cursor-pointer">
                    Active (visible on website)
                  </Label>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-6">
              <div className="space-y-3">
                <Button type="submit" disabled={saving || uploading} className="w-full gap-2">
                  <Save className="h-4 w-4" />
                  {uploading ? "Uploading Image..." : saving ? "Saving..." : "Save Changes"}
                </Button>
                <Button type="button" variant="outline" asChild className="w-full">
                  <Link href="/admin/team">Cancel</Link>
                </Button>
                <Button 
                  type="button" 
                  variant="destructive" 
                  className="w-full gap-2"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Member
                </Button>
              </div>
            </Card>

            {/* Member Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Member Info</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <p className="font-medium">{new Date(member.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Updated:</span>
                  <p className="font-medium">{new Date(member.updated_at).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </form>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Team Member"
        description={`Are you sure you want to delete ${member.name}? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
}
