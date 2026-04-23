# Kinlore

A self-contained family photo tagging tool built as a single HTML file. Scan old photos, tag the people and dates you remember, and distribute a polished, searchable viewer to family members on a flash drive — no apps, no internet, no technical knowledge required on their end.

---

## Overview

Kinlore is two things:

- **`kinlore.html`** — the tagging tool you use to organize photos (requires Chrome or Edge)
- **A generated viewer** — an HTML file produced by Kinlore that family members open directly from a flash drive

You open `kinlore.html` in your browser, create a named collection pointing to a folder of scanned photos, and work through them one by one — tagging names, adding approximate dates, and writing captions. When you're done, click **Export** to produce a self-contained viewer you can drop on a flash drive. Anyone can open it in Edge on Windows with no setup at all.

---

## Requirements

- **Chrome or Edge** — required for `kinlore.html` (uses the File System Access API)
- The generated viewer works in any modern browser

---

## Collections

When you open Kinlore, you land on the **Your Collections** home screen. A collection is a named reference to a folder of photos — Kinlore remembers it across sessions so you can reopen it without browsing for the folder again.

**Creating a collection**
Click **New Collection**, enter a name, and select the photos folder. Kinlore saves the reference and opens it immediately.

**Reopening a collection**
Click any collection card on the home screen. If the folder has moved, a prompt lets you point Kinlore to the new location.

**Open Folder** (next to New Collection) opens a folder without saving it as a named collection — useful for one-off use.

**Renaming or deleting**
Each collection card has rename (✎) and delete (×) buttons. Deleting a collection only removes it from Kinlore — photos and metadata on disk are untouched.

---

## Getting Started

1. Download `kinlore.html` and open it in Chrome or Edge
2. Click **New Collection**, name it, and select a folder of scanned photos
3. A dialog will appear showing the photo count and an option to generate thumbnails — check the box if this is your first time opening this folder
4. Click any photo in the grid to start tagging

---

## Tagging Photos

Clicking a photo opens it in the left pane with the tag editor on the right.

**People**
Type a name in the people field. As you type, existing names are suggested — press Enter to select the highlighted match, or keep typing to add a new name. Press Enter or comma to commit each name. Names become filterable tags in the viewer.

**Date**
Year, month, and day are all optional — fill in only what you know. You can enter just a year (`1985`), a year and month (`1985-06`), or a full date.

**Caption**
Free-text notes about the photo — who's there, what's happening, where it was taken.

**Saving**
- **Save & Next** — saves and moves to the next photo
- **Save** — saves and stays on the current photo
- **Discard** — discards any unsaved changes

Metadata is automatically written to disk on every save.

---

## Scan Mode

If you're scanning photos and want to tag them as they come off the scanner:

1. Point your scanner software at the photos folder (most scanners can save directly to a folder)
2. Click **Scan Mode** in the header
3. Kinlore watches the folder for new files — when a new scan appears it opens automatically for tagging
4. After saving, a "Waiting for next scan…" screen appears until the next photo arrives
5. Press **Stop Scanning** or Escape to exit scan mode

If you're currently editing a photo when you enter scan mode, it's saved automatically before the waiting screen appears. If a new photo arrives while you're mid-edit, it queues up and opens as soon as you save or discard the current one.

---

## Bulk Editing

To apply metadata to multiple photos at once, click **Bulk Edit** in the header.

1. Click photos in the grid to select them (Shift+click to select a range)
2. Fill in any combination of people, date, and caption — blank fields are left unchanged on each photo
3. **Auto-rename on save** (checked by default) — renames the selected files based on their metadata when you click Apply
4. Click **Apply to X photos**

The **Rename** section at the bottom also lets you manually trigger renaming or revert files to their original names at any time.

---

## Renaming Files

Kinlore can rename photo files based on their metadata to something meaningful like `1985-06_Grandma_Dad.jpg`. This happens automatically on save when the **Auto-rename on save** checkbox is checked in bulk edit, or you can trigger it manually with the **Auto-rename selected** button.

Original filenames are preserved in metadata and can be restored at any time using **Revert names**.

---

## Exporting the Viewer

Click **Export** in the header to open the export dialog.

**Viewer title**
Enter a name for the viewer (e.g. "The Johnson Family"). This becomes the viewer's page title and the name of the exported HTML file.

**Destination**

- **Export to another location** *(default)* — opens a folder picker so you can write directly to a flash drive or output folder. The **Include photos** checkbox (checked by default) copies all photos and thumbnails alongside the viewer, making the output completely self-contained.
- **Save in current folder** — writes the viewer into the current collection's folder. Useful for updating the viewer in place.

**Include collections** *(shown when exporting to another location with multiple collections)*
Select which collections to bundle into a single viewer. When multiple collections are included, the viewer opens to a collection picker screen so family members can choose which set of photos to browse.

The viewer is a single self-contained HTML file with all metadata baked in. It includes:
- A grid of all photos with polaroid-style cards showing names and dates
- Filter buttons for each tagged person
- A search bar for captions and names
- A lightbox with full-size images, metadata, and keyboard navigation (arrow keys, Escape)

It works from a flash drive via `file://` — no server or internet needed.

---

## Folder Structure

When exporting to another location:

```
Family Photos/           ← the output folder (e.g. a flash drive)
├── Family Photos.html   ← the viewer — this is what family members open
└── _media/              ← photos and thumbnails (named to stay out of the way)
      ├── thumbs/
      └── *.jpg
```

For a multi-collection export, photos are namespaced by collection:

```
Family Archive.html
_media/
  ├── Grandma & Grandpa/
  │     ├── thumbs/
  │     └── *.jpg
  └── Mawmaw & Pawpaw/
        ├── thumbs/
        └── *.jpg
```

When saving in the current folder, the viewer is written alongside your photos and the existing folder structure is preserved.

---

## metadata.json

Tag data is stored as a plain JSON file in the `_kinlore/` subfolder of each collection:

```json
{
  "IMG_001.jpg": {
    "people": ["Grandma", "Dad"],
    "date": "1985-06",
    "caption": "Summer holiday at the lake"
  }
}
```

Dates are always partial-date friendly — `"1985"`, `"1985-06"`, or `"1985-06-15"` are all valid.
