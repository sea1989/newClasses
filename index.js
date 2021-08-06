class Fetcher {
    constructor(url) {
        this.url = url;
    }

    getData() {
        return axios.get(this.url)
            .then((response) => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                this._data = response.data.results;
                return this._data;
            }
            )
    }

    drawElements() {

        if (!this._data) {

            this.getData().then(this.addElement)

        } else {
            this.addElement(this._data);
        }
    }

    addElement(data) {
        for (let i of data) {
            var newTR = document.createElement("tr");
            newTR.innerHTML = `<td>${i.name}</td><td>${i.height}</td><td>${i.mass}</td>`;
            const tableElement = document.getElementById("table");
            tableElement.append(newTR);

            const person = new Person(i.name);
            person.sayMyName();
        }
    }
}

class Person {
    constructor(dataName) {
        this._dataName = dataName;
    }

    sayMyName() {
        console.log('мое имя' + this._dataName)
    }
}

const fetcher = new Fetcher("https://swapi.dev/api/people");
fetcher.drawElements();
