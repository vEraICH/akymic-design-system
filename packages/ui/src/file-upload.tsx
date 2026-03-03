"use client";

import React, { useId, useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import { cn } from "./lib/utils";

export interface FileUploadProps {
  value?: File[];
  onChange?: (files: File[]) => void;
  accept?: string;
  maxSize?: number; // bytes
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  id?: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  value = [],
  onChange,
  accept,
  maxSize,
  maxFiles,
  multiple = true,
  disabled,
  error,
  className,
  id,
}: FileUploadProps) {
  const uid = useId();
  const inputId = id ?? `${uid}-input`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [sizeErrors, setSizeErrors] = useState<string[]>([]);

  function addFiles(incoming: FileList | null) {
    if (!incoming || disabled) return;
    const arr = Array.from(incoming);

    // Check size
    const oversized: string[] = [];
    const valid = arr.filter((f) => {
      if (maxSize && f.size > maxSize) {
        oversized.push(f.name);
        return false;
      }
      return true;
    });
    setSizeErrors(oversized);

    // Deduplicate by name
    const existing = value.map((f) => f.name);
    const fresh = valid.filter((f) => !existing.includes(f.name));
    const merged = [...value, ...fresh];

    // Respect maxFiles
    const capped = maxFiles ? merged.slice(0, maxFiles) : merged;
    onChange?.(capped);
  }

  function removeFile(name: string) {
    onChange?.(value.filter((f) => f.name !== name));
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    if (!disabled) setDragActive(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    addFiles(e.dataTransfer.files);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    addFiles(e.target.files);
    // Reset so the same file can be re-added after remove
    e.target.value = "";
  }

  const atMax = maxFiles !== undefined && value.length >= maxFiles;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload files"
        aria-disabled={disabled}
        onClick={() => !disabled && !atMax && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (!disabled && !atMax && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-6 text-center transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          disabled
            ? "cursor-not-allowed opacity-50 border-border"
            : atMax
            ? "cursor-not-allowed border-border opacity-60"
            : dragActive
            ? "border-primary bg-primary/5 cursor-copy"
            : error
            ? "border-destructive/50 hover:border-destructive cursor-pointer"
            : "border-border hover:border-primary/60 cursor-pointer"
        )}
      >
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full",
            dragActive ? "bg-primary/15" : "bg-muted"
          )}
        >
          <Upload
            className={cn(
              "h-4 w-4",
              dragActive ? "text-primary" : "text-muted-foreground"
            )}
          />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            {atMax ? "Maximum files reached" : "Drop files here or click to browse"}
          </p>
          <p className="mt-0.5 text-[11.5px] text-muted-foreground">
            {[
              accept && `Accepts ${accept}`,
              maxSize && `Max ${formatSize(maxSize)} per file`,
              maxFiles && `Up to ${maxFiles} file${maxFiles !== 1 ? "s" : ""}`,
            ]
              .filter(Boolean)
              .join(" · ") || "Any file type"}
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled || atMax}
        onChange={handleChange}
        className="sr-only"
        tabIndex={-1}
      />

      {/* Size error messages */}
      {sizeErrors.length > 0 && (
        <p className="text-[12px] text-destructive">
          Too large (skipped): {sizeErrors.join(", ")}
        </p>
      )}

      {/* File list */}
      {value.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {value.map((file) => (
            <li
              key={file.name}
              className="flex items-center gap-2.5 rounded-md border border-border bg-card px-3 py-2"
            >
              <FileText className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-foreground">
                  {file.name}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {formatSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() => removeFile(file.name)}
                disabled={disabled}
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
