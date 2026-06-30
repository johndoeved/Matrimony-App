from PIL import Image

# Open the layout mockup image
img = Image.open('website/public/images/layout_mockup.jpeg')
width, height = img.size
print(f"Original size: {width}x{height}")

# We want to crop the clean hands area.
# In the mockup, the hands are in the upper-middle right.
# Let's crop from the middle to the right, and the top to the middle.
# Specifically, the hands holding are around (x=40%, y=10%) to (x=100%, y=50%)
left = int(width * 0.35)
top = int(height * 0.10)
right = int(width * 1.0)
bottom = int(height * 0.55)

cropped_img = img.crop((left, top, right, bottom))
cropped_img.save('website/public/images/hands_bg.jpeg')
print(f"Cropped image saved as hands_bg.jpeg with size: {cropped_img.size}")
