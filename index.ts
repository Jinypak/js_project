interface File {
    type: string;
    size: number;
}

// FileList의 타입을 File[]로 지정
interface FileList {
    readonly files: File[];
}

interface PromiseConstructor {
    new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
}

declare const Promise: PromiseConstructor;

interface FormData {
    append(name: string, value: string | Blob, fileName?: string): void;
}

const form: HTMLFormElement = document.querySelector('form');
const fileInput: HTMLInputElement = document.querySelector('input[type="file"]');
const progressArea: HTMLDivElement = document.querySelector('.progress-area');
const uploadedArea: HTMLDivElement = document.querySelector('.uploaded-area');

form.addEventListener('click', () => {
    fileInput.click();
});

fileInput.onchange = ({ target }) => {
    // @ts-ignore
    const file: File = target.files[0] as File;
    if (file) {
        let fileName = file.name;
        if (fileName.length >= 12) {
            const splitName = fileName.split('.');
            fileName = splitName[0].substring(0, 13) + '...' + splitName[1];
        }
        uploadFile(fileName);
    }
};

async function uploadFile(name: string): Promise<void> {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/upload.php');
    xhr.upload.addEventListener('progress', ({ loaded, total }) => {
        const fileLoaded = Math.floor((loaded / total) * 100);
        const fileTotal = Math.floor(total / 1000);
        let fileSize: string;
        if (fileTotal < 1024) {
            fileSize = fileTotal + ' KB';
        } else {
            fileSize = (loaded / (1024 * 1024)).toFixed(2) + ' MB';
        }
        const progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
        uploadedArea.classList.add('onprogress');
        progressArea.innerHTML = progressHTML;
        if (loaded === total) {
            progressArea.innerHTML = '';
            const uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
            uploadedArea.classList.remove('onprogress');
            uploadedArea.insertAdjacentHTML('afterbegin', uploadedHTML);
        }
    });
    const data = new FormData(form);
    await xhr.send(data);
}
