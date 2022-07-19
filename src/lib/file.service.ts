class FileService {

    getFile() {
      return JSON.parse(localStorage.getItem("file") || '{}');
    }

    setFile(file: any) {
      localStorage.setItem("file", JSON.stringify(file));
    }

    removeFile() {
      localStorage.removeItem("file");
    }
  }
  export default new FileService();
  