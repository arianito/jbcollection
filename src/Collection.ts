export type PredicateProp<T> = string | ((obj: T) => any);
function predicate(a, b, prop) {
	if (typeof prop === 'string')
		return a[prop] == b[prop];
	else
		return prop(a) == prop(b)
}

function select(a, prop) {
	if (typeof prop === 'string')
		return a[prop];
	else
		return prop(a)
}


export class Collection {

	static LeftJoin<T = any>(left: T[], right: T[], prop: PredicateProp<T>): T[] {
		return left.filter(a => {
			return !right.find(b => {
				return predicate(a, b, prop);
			});
		});
	}

	static RightJoin<T = any>(left: T[], right: T[], prop: PredicateProp<T>): T[] {
		return this.LeftJoin(right, left, prop);
	}


	static InnerJoin<T = any>(left: T[], right: T[], prop: PredicateProp<T>): T[] {
		const trimmedFromA = {};
		return left.filter(a => {
			return right.find(b => {
				const m = predicate(a, b, prop);
				if (m) {
					trimmedFromA[select(b, prop)] = b;
				}
				return m;
			});
		}).map(b => {
			return {
				...b,
				...trimmedFromA[select(b, prop)],

			}
		})
	}

	static OuterJoin<T = any>(left: T[], right: T[], prop: PredicateProp<T>): T[] {
		return this.LeftJoin(left, right, prop).concat(this.RightJoin(left, right, prop));
	}

	static Join<T = any>(left: T[], right: T[], prop: PredicateProp<T>): T[] {
		const trimmedFromA = {};
		const reduced = left.filter(a => {
			const c = right.find(b => {
				return predicate(a, b, prop);
			});
			if (c) {
				trimmedFromA[select(a, prop)] = a;
			}
			return !c
		});
		return reduced.concat(right.map(b => {
			return {
				...trimmedFromA[select(b, prop)],
				...b,
			}
		}));
	}

}
