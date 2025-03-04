# PowerShell script to generate and update images.json with image metadata
#
# This script scans the current directory for .jpg images and updates a JSON file (images.json)
# containing metadata about each image. It ensures that new images are added while preserving
# existing data, including manually edited fields.
#
# Requirements:
# - The script should only create images.json if it does not already exist.
# - Existing image metadata should not be modified.
# - New images should be added with default metadata values.
# - Removed images should not be deleted from images.json.
# - Each image should have a sort order integer for future sorting purposes.
# - New images should initially have a sort order of -1 and later be assigned a sequential number.
# - The script should exit with an error message if no .jpg files are found.
#
# Assumptions:
# - The script runs in the correct directory containing the .jpg images.
# - The script and images.json are stored in the same directory.
# - The script is executed in an environment where PowerShell and JSON handling are supported.

# Display the current working directory for debugging
Write-Host "Current working directory: $(Get-Location)"

# Define the JSON file name
$jsonFile = "images.json"

# Load existing JSON data if the file exists
if (Test-Path $jsonFile) {
    $existingData = Get-Content $jsonFile | ConvertFrom-Json
} else {
    $existingData = @()
}

# Convert existing data to a hashtable for quick lookup
$existingImages = @{ }
foreach ($item in $existingData) {
    $existingImages[$item.filePath] = $item
}

# Get list of .jpg files in the current directory
$imageFiles = Get-ChildItem -Path . -Filter "*.jpg"

# Exit with an error message if no images are found
if (-not $imageFiles) {
    Write-Host "Error: No .jpg files found in the current directory. Please change to the correct directory and try again." -ForegroundColor Red
    exit 1
}

# Initialize an array to hold updated image data
$updatedData = @()

# Track the highest sort number in the existing data
$maxSortNumber = [int]($existingData | Measure-Object sortOrder -Maximum).Maximum
if ($null -eq $maxSortNumber) {
    $maxSortNumber = 0
}

# Process each image file
foreach ($image in $imageFiles) {
    $filePath = $image.Name
    
    if ($existingImages.ContainsKey($filePath)) {
        # Keep existing data
        $updatedData += $existingImages[$filePath]
    } else {
        # Add new image entry with default values
        $updatedData += [PSCustomObject]@{
            filePath = $filePath
            title = "Untitled"
            description = "No description"
            sortOrder = -1  # Flag as new entry
        }
    }
}

# Assign valid sort numbers to new images
$newEntries = $updatedData | Where-Object { $_.sortOrder -eq -1 }
foreach ($entry in $newEntries) {
    $maxSortNumber++
    $entry.sortOrder = [int]$maxSortNumber
}

# Convert updated data back to JSON and save it
$updatedData | ConvertTo-Json -Depth 10 | Set-Content $jsonFile
