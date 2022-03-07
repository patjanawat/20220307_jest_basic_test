exports.getScore = score => {
    if (score < 50) {
        return 'F'
    }
    return 'A'
}

exports.withDraw = money => new Promise((resolve, reject) => {
    if (money >= 500) {
        resolve(money)
    } else {
        resolve(0)
    }
});

exports.fetchData = () => new Promise(resolve => {
    setTimeout(() => {
        resolve('success');
    }, 3000);
});

exports.login = async () => {
    const response = await this.fetchData();
    return response === 'success';
}