let f = []
let l = [{ id: 1 }, { id: 2 }, { id: 1 }, { id: 1 },]
for (let i = 1; i <= 2; i++) {
    f.push(l.filter((item) => { if (item.id === i) return item }))
}

console.log(f)