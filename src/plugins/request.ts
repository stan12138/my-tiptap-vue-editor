import axios from "axios";

export class Base {
    // static base_url = "/api"
    static base_url = ""
}

axios.defaults.withCredentials = true

axios.interceptors.request.use(function (config) {
    console.log("请求拦截:", config)
    config.headers["Token"] = "stan-12345"
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if(response.data.errno == -100) {
        window.location.href = '/login'
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

function createPostForm(fileList: Array<File>) {
    let chunks: Array<Blob> = [];
    let record = []
    let name = []
    const size = 1024*1024;
    let prefix = randomString(20);
    let types = []
    for(let index=0; index<fileList.length; index++) {
        let file = fileList[index];
        let current_length = 0;
        let num = 0
        name.push(file.name)
        types.push(file.type)
        while(current_length < file.size) {
            const chunk = file.slice(current_length, current_length + size)
            chunks.push(chunk);
            current_length += size
            num += 1
        }
        record.push(num)
    }
    let info = {"num_record": record, "chunks": chunks, "names": name}
    const formDatas = info["chunks"].map((chunk, index) => {
        const formData = new FormData();
        formData.append("chunk", chunk)
        formData.append("index", index)
        formData.append("prefix", prefix)
        return formData;
    })
    const finalForm = {
        nums: info["num_record"], names: info["names"], prefix: prefix, types: types
    }

    return {"forms": formDatas, "final": finalForm}
}

function randomString(length: number) {
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) 
        result += str[Math.floor(Math.random() * str.length)];
    return result;
}

function multiPost(url: string, forms: Array<FormData>, config: object) {
    let workers = Math.min(5, forms.length);
    if(forms.length > 20) {
        workers = Math.min(30, Math.round(forms.length/2))
    }
    return new Promise((resolve) => {
        let len = forms.length;
        let counter = 0;
        const startPost: Function = async () => {
            const form = forms.shift()
            if (!form) {
                return ;
            }
            await Request.post(url, form, config);
            if (counter == len - 1) {
                resolve(true)
                return ;
            }
            counter ++;
            startPost();
        }
        for (let index=0; index<workers; index++) {
            startPost();
        }
    })
}

export class Request {
    static get = (url: string, params?: any) => {
        return new Promise((resolve, reject) => {
            axios.get(Base.base_url + url, { params: params }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            }) 
        })
    }

    static post = (url: string, params?: any, config?: any) => {
        return new Promise((resolve, reject) => {
          axios.post(Base.base_url + url, params, config).then(res => {
            resolve(res);
          }).catch(err => {
            reject(err);
          })
        })
    }

    static singleFilePost = (url: string, file: File) => {
        let formData = new FormData()
        formData.append('file', file)
        let config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(url, formData, config).then(res => {
              resolve(res);
            }).catch(err => {
              reject(err);
            })
        })
    }

    static fastFilePost = (url: string, lastUrl: string, fileList: Array<File>, config?: any, lastPostRecall?: ()=>boolean, finalRecall?: (res: object)=>boolean) => {
        let info = createPostForm(fileList);
        let fileForms = info["forms"]
        let lastInfo = info["final"]
        multiPost(url, fileForms, config).then(() => {
            if(lastPostRecall) {
                lastPostRecall()
            }
            this.post(lastUrl, lastInfo).then((res: any) => {
                if(finalRecall) {
                    finalRecall(res)
                }
            })
        })
    }
    
    static downloadFile = (filename: string, url: string) => {
        axios({url: url,
            method: 'GET',
            responseType: 'blob',
        }).then((res) => {
            var FILE = window.URL.createObjectURL(new Blob([res.data]));
            var docUrl = document.createElement('a');
            docUrl.style.display = "none"
            docUrl.href = FILE;
            docUrl.download = filename
            docUrl.click();
        });
    }

}