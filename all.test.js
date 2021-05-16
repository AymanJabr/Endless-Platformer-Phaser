const { capitalize, reverseString, addNumbers, subtractNumbers, multiplyNumbers, divideNumbers } = require('./index.js')


// import {capitalize, addNumbers, subtractNumbers, multiplyNumbers, divideNumbers} from './index'

test('capitalize string successfully', () => {
    expect(capitalize("name")).toBe("Name");
});
test('capitalize string wrongly', () => {
    expect(capitalize("name")).not.toBe("NaMe");
});
test('capitalize int returns empty', () => {
    expect(capitalize(5)).toBe('');
});


test('return reverse string successfully', () => {
    expect(reverseString("name")).toBe("eman");
});
test('capitalize string wrongly', () => {
    expect(reverseString("name")).not.toBe("NaMe");
});
test('capitalize int returns empty', () => {
    expect(reverseString(5)).toBe('');
});


test('adds 1 + 2 to equal 3', () => {
    expect(addNumbers(1, 2)).toBe(3);
});
test('adds 1 + 2 to not equal 3', () => {
    expect(addNumbers(1, 4)).not.toBe(3);
});


test('subtracts 2 - 1 to equal 1', () => {
    expect(subtractNumbers(2, 1)).toBe(1);
});
test('subtracts 2 - 1 to not equal 1', () => {
    expect(subtractNumbers(2, 1)).not.toBe(3);
});


test('multiplies 2 x 3 to equal 6', () => {
    expect(multiplyNumbers(2,3)).toBe(6);
});
test('multiplies 2 x 3 to not equal 3', () => {
    expect(multiplyNumbers(2 ,3 )).not.toBe(3);
});


test('divides 4/2 to equal 2', () => {
    expect(divideNumbers(4, 2)).toBe(2);
});
test('divides 4/2 to not equal 3', () => {
    expect(divideNumbers(4,2)).not.toBe(3);
});