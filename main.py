from fastapi import FastAPI, File, UploadFile, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import os

app = FastAPI()

# Get the directory of the current script
current_dir = os.path.dirname(os.path.realpath(__file__))

# Serve static files (CSS, JS)
app.mount("/static", StaticFiles(directory=current_dir), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open(os.path.join(current_dir, "index.html"), "r") as f:
        content = f.read()
    return HTMLResponse(content=content)

@app.post("/upload")
async def upload_file(animal: str = Form(...), file: UploadFile = File(...)):
    # Get file information
    file_name = file.filename
    file_size = file.size
    file_type = file.content_type

    return {
        "message": f"File uploaded successfully for {animal}",
        "file_name": file_name,
        "file_size": file_size,
        "file_type": file_type
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
