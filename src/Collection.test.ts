import {Collection} from "@lib/collection";

test('merge two array by property', () => {
	const a = [
		{id: 'id1', name: 'data1'},
		{id: 'id2', name: 'data2', test: 'hello'},
		{id: 'id3', name: 'data3'},
	];
	const b = [
		{id: 'id2', name: 'replaced2'},
		{id: 'id4', name: 'data4'},
		{id: 'id5', name: 'data5'},
	];

	expect(Collection.Join(a, b, 'id')).toEqual([
		{id: 'id1', name: 'data1'},
		{id: 'id3', name: 'data3'},
		{id: 'id2', name: 'replaced2', test: 'hello'},
		{id: 'id4', name: 'data4'},
		{id: 'id5', name: 'data5'},
	])
});

test('left join arrays', () => {
	const a = [
		{id: 'id1', name: 'data1'},
		{id: 'id2', name: 'data2', test: 'hello'},
		{id: 'id3', name: 'data3'},
	];
	const b = [
		{id: 'id2', name: 'replaced2'},
		{id: 'id4', name: 'data4'},
		{id: 'id5', name: 'data5'},
	];

	expect(Collection.LeftJoin(a, b, 'id')).toEqual([
		{id: 'id1', name: 'data1'},
		{id: 'id3', name: 'data3'},
	])
});
test('right join arrays', () => {
	const a = [
		{id: 'id1', name: 'data1'},
		{id: 'id2', name: 'data2', test: 'hello'},
		{id: 'id3', name: 'data3'},
	];
	const b = [
		{id: 'id2', name: 'replaced2'},
		{id: 'id4', name: 'data4'},
		{id: 'id5', name: 'data5'},
	];

	expect(Collection.RightJoin(a, b, 'id')).toEqual([
		{id: 'id4', name: 'data4'},
		{id: 'id5', name: 'data5'},
	])
});
test('inner join arrays', () => {
	const a = [
		{id: 'id1', name: 'data1'},
		{id: 'id2', name: 'data2', test: 'hello'},
		{id: 'id3', name: 'data3'},
	];
	const b = [
		{id: 'id2', name: 'replaced2'},
		{id: 'id4', name: 'data4'},
		{id: 'id5', name: 'data5'},
	];

	expect(Collection.InnerJoin(a, b, a => a.id)).toEqual([
		{id: 'id2', name: 'replaced2', test: 'hello'},
	])
});
