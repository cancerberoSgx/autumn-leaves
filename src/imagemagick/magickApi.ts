import { InputFile } from '.';

function CreatePromiseEvent(): Promise<any> {
    let resolver;
    let rejecter;
    let emptyPromise = new Promise((resolve, reject) => { resolver = resolve; rejecter = reject });
    // @ts-ignore
    emptyPromise['resolve'] = resolver;
    // @ts-ignore
    emptyPromise['reject'] = rejecter;
    return emptyPromise;
}
// declare const magickWorkerPromisesKey: any
export function Call(inputFiles: InputFile[], command: string[]): Promise<any> {
    let request = {
        'files': inputFiles,
        'args': command,
        'requestNumber': magickWorkerPromisesKey
    };

    let emptyPromise = CreatePromiseEvent();

    // @ts-ignore
    magickWorkerPromises[magickWorkerPromisesKey] = emptyPromise; // TODO: does this really need to be global ? 

    getWorker().postMessage(request);

    magickWorkerPromisesKey = magickWorkerPromisesKey + 1
    return emptyPromise;
}

let magickWorker: any

let magickWorkerPromises = {}
let magickWorkerPromisesKey = 1

function getWorker() {
    if (!magickWorker) {
        // @ts-ignore
        const url = `${window.MAGICK_PREFIX || ''}magick.js`
        magickWorker = new Worker(url);
        magickWorkerPromises = {}
        magickWorkerPromisesKey = 1
    }
    return magickWorker
}

// handle responses as they stream in after being processed by image magick
getWorker().onmessage = function (e: any) {
    // display split images
    let response = e.data
    // @ts-ignore
    let getPromise = magickWorkerPromises[response['requestNumber']];
    // @ts-ignore
    delete magickWorkerPromises[response['requestNumber']];
    let files = response['processed']
    // debugger
    if (files.length == 0) {
        getPromise['reject']("No files generated")
    }
    else {
        getPromise['resolve'](files);
    }
};