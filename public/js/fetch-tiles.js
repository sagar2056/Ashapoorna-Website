const url = "/getTiles";

fetch(url)
.then((data) => {
    return data.json();
})
.then((res) => {
    res.map((element) => {
        console.log(element);
        $("." + element.number + "-name").text(element.name);
        $("." + element.number + "-price").text(element.price);
    })
})
.catch((err) => {
    console.log(err);
});