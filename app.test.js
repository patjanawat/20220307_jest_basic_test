const app = require('./app');
const { getScore, fetchData, withDraw, login } = require('./app');

it('should get A', () => {
    expect(getScore(50)).toEqual('A');
    expect(getScore(100)).toEqual('A');
});

it('should get F', () => {
    expect(getScore(1)).toEqual('F')
    expect(getScore(49)).toEqual('F')
})

it('should withdraw', async () => {
    const money = await withDraw(500);
    expect(money).toEqual(parseInt(500));

    const money1 = await withDraw(1000);
    expect(money1).toEqual(parseInt(1000));
});

it('do not withdraw', async () => {
    const money = await withDraw(400);
    expect(money).toEqual(parseInt(0));

    const money1 = await withDraw(1);
    expect(money1).toEqual(parseInt(0));
});


it('fetch data should be success', async () => {
    const response = await fetchData()
    expect(response).toEqual('success')
});

it('mock fetch data should be success', async () => {
    // const response = await fetchData()
    let withdrawmock = jest.fn();
    withdrawmock.mockReturnValue("success");
    expect(withdrawmock()).toEqual('success')
});

it('async mock fetch data should be success', async () => {
    let withdrawmock = await fetchData()
    withdrawmock = jest.fn();
    withdrawmock.mockResolvedValue("success");

    await expect(withdrawmock()).resolves.toEqual('success');
});

it('login: should logged', async () => {
    const isLoggedIn = await login();
    expect(isLoggedIn).toBe(true);
})

it('spyon and custom response', async () => {
    const spy = jest.spyOn(app, 'fetchData').mockResolvedValue('fail')

    const isLoggedIn = await app.login();
    expect(isLoggedIn).toBe(false);

    expect(spy).toHaveBeenCalled();
    app.fetchData.mockRestore();
});