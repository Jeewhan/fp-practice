const _ = Symbol("parameter");
const ___ = Symbol("rest parameters");

const reduce = function(f, acc, iter) {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const v of iter) {
    acc = f(acc, v);
  }

  return acc;
};

const map = function(f, iter) {
  const fn = (acc, v) => acc.concat(f(v));
  return reduce(fn, [], iter);
};

const filter = function(f, iter) {
  const fn = (acc, v) => (f(v) ? acc.concat(v) : acc);
  return reduce(fn, [], iter);
};

const groupBy = function(f, iter) {
  const fn = (acc, v) => {
    const k = f(v);
    if (!acc[k]) acc[k] = [v];
    else acc[k].push(v);
    return acc;
  };
  return reduce(fn, {}, iter);
};

const countBy = function(f, iter) {
  const fn = (acc, v) => {
    const k = f(v);
    if (!acc[k]) acc[k] = 1;
    else acc[k] += 1;
    return acc;
  };
  return reduce(fn, {}, iter);
};

const indexBy = function(f, iter) {
  const fn = (acc, v) => {
    const k = f(v);
    const key = typeof k !== "string" ? String(k) : k;
    acc[k] = v;
    return acc;
  };
  return reduce(fn, {}, iter);
};

function isIterable(target) {
  return target != null && Symbol.iterator in Object(target);
}

const pipe = function(...fs) {
  const fn = (acc, f) => (isIterable(acc) ? f(...acc) : f(acc));
  return (...iter) => reduce(fn, iter, fs);
};

const go = function(iter, ...fs) {
  return pipe(...fs)(...iter);
};

const curry = function() {};

const partial = function() {};

export {
  reduce,
  map,
  filter,
  groupBy,
  countBy,
  indexBy,
  pipe,
  go,
  curry,
  partial,
  _,
  ___,
};
