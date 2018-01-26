---
layout: "post"
title: "Exploring C++ Part 1: std::lower_bound"
date: "2018-01-25"
comments: true
equations: true
draft: false
---

## Introduction

Binary search is one of the most widely used, and arguably most important algorithm for any programmer to know. While conceptually straightforward, it can be [surprisingly difficult](https://research.googleblog.com/2006/06/extra-extra-read-all-about-it-nearly.html) to implement correctly. In addition, issues crop up in generalizing across input types. C++ provides the ability to do so through its templating system. However, in using templated algorithms, one must be careful to respect any implicit constraints on template type parameters, as failing to do so can lead to code that is hard to debug.

For these reasons, it can be instructive to take a closer look binary search, and why I have chosen to discuss it here (also because I've been watching a lot of Alexander Stepanov and Sean Parent lectures on YT lately 😅). The following considers `std::lower_bound`, a particular flavour of binary search included in the C++ Standard Template Library. Let's have a look!

## Description

One of four binary search algorithms included in the Standard Template Library (STL) since its first publication in 1994 {% cite stepanov1995standard %}, `std::lower_bound` returns the position of the first element of a sorted range that does not precede the search key.

The STL exposes two ways to call `std::lower_bound`, which I'll call version&nbsp;1 and version&nbsp;2, respectively:

```c++
template <typename I, typename T>
I lower_bound(I first, I last, T const& value);
```
```c++
template <typename I, typename T, typename Compare>
I lower_bound(I first, I last, T const& value, Compare cmp);
```

Version&nbsp;1 is a specialization of version&nbsp;2, using the *less than* operator (`operator<`) to make comparisons between `value` and elements of the input range `[first, last)`, while version&nbsp;2 accepts a user-provided comparator.

We can see a possible implementation below, which is based on the one given by Sean Parent in {% cite parent2016bettercode %}:

```c++
#include <iterator>

template <typename I, typename T, typename Compare>
// Requires ForwardIterator(I), and Compare partitions [first, last)
// with respect to the expression cmp(elem, value).
I lower_bound(I first, I last, T const& value, Compare cmp) {
    // preconditions:
    //   - [first, last) is a valid range
    // postconditions:
    //   - the iterator returned is in the range [first, last]
    auto n = distance(first, last);
    while (n != 0) {
        auto h = n/2;
        auto m = next(first, h);
        if (cmp(*m, value)) {
            first = next(m, 1);
            n -= h + 1;
        } else {
            n = h;
        }
    }
    return first;
}
```

The algorithm works as per the expected behaviour of binary search: given a sorted range, it performs a comparison with the median element, discarding the half-range that does not include the search key, then continues inductively on remaining elements until termination. The value returned is an iterator pointing to the element that satisfies the search criteria, if found, otherwise `last`.

Note that the convention of using [half-open intervals](https://en.wikipedia.org/wiki/Interval_(mathematics)#Terminology) to indicate ranges. Depending on whichever is more convenient, either a bounded range `[first, last)`, or a counted range `[first, n)` $\equiv$ `[first, first+n)`, is used. The half-open notation expresses that `last` $\equiv$ `first+n` points to the first element past the last dereferenceable element of the range (as iterators, like pointers, are dereferenced to get the value they point to). Used as a token, `last` safely denotes the end of a range without being required to point to valid memory, but as such, should never be dereferenced. When returned from an algorithm, `last` is interpreted as a negative result.

Another point to consider is that the C++ standard does not require that compilers implement [tail-call](https://en.wikipedia.org/wiki/Tail_call) optimization. As as result, algorithms implemented in C++ tend to use loops, rather than recurrence, to avoid bottoming out the call-stack.

Now that we have our algorithm, we can exercise it like so:

```c++
#include <iostream>
#include <vector>
#include "lower_bound.h"

int main(int argc, char* argv[]) {
    auto v = std::vector<int>{ 1, 1, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6 };

    auto first = begin(v);
    auto last  = end(v);

    // extra parens disambiguate call to lower_bound
    auto it = (lower_bound)(first, last, 4, std::less<int>());

    if (it == last) {
        std::cout << "not found!" << std::endl;
    } else {
        std::cout << distance(first, it) << ", " << *it << std::endl;
    }
}
```

which gives the result:

```
7, 4
```

Here, our call to `lower_bound` returned an iterator pointing to the 7th element, which has a value of 4. This is indeed the first element that does not precede 4 in the range that we supplied.

To further illustrate the algorithm's behaviour, suppose that we run the it again with all the 4's of the input range changed to 5's, and with the search key left unchanged. We would again receive an iterator pointing to the 7th element, which would still be the first element not preceding a value of 4, but it would instead have a value of 5. If we subsequently run the algorithm with a search key greater than 6, we would receive an iterator pointing to `last`. Such is the behaviour of `lower_bound`.

(See this [graphic](/assets/img/blog/2018-01-25-std-lower-bound.png){ target: _blank } for a visual demonstration of how `lower_bound` behaves with the first set of inputs.)

## Analysis

### Type Requirements

As mentioned above, C++ enables generic programming through its templating system. Templatizing an algorithm increases its applicability across a variety of input types, while introducing the extra burden on callers who must be careful to respect any implicit requirements on template type parameters. Failure to do so can lead to crashes, undefined behaviour, or cryptic compile-time errors.

Our case is no exception. For our algorithm to behave correctly, it is required that

1. Template type parameter `I` is a model of [`ForwardIterator`](http://en.cppreference.com/w/cpp/concept/ForwardIterator), and
2. The expression `element < value` is valid for all elements of the input range (version&nbsp;1) or the template type parameter `Compare` is a binary predicate where `cmp(element, value)` forms a partition of the range `[first, last)` (version&nbsp;2).

The first requirement states that `I` is a type of iterator with the ability to be incremented forward, without invalidating any copies made prior to incrementing (known as the [multipass guarantee](http://en.cppreference.com/w/cpp/concept/ForwardIterator#Multipass_guarantee) where for instances `a`, `b` of `I` it is the case that `a == b` and `++a == ++b` are  when `a` and `b` point to the same element), and that elements are both readable and writable via the iterator. For our purposes, we need only to read from instances of `I`.

As for the second requirement, up until now, I have been using *precedes* where I might have been using *less than*. This is true for version&nbsp;1 of the algorithm, which actually satisfies a stricter requirement. However, all we really need is something that defines a partition on the input range, where every element that *precedes* the search key succeeds in the comparison, while every other element fails---giving us our partition. It is sufficient to use *precedes*, indicating that there is at least a [*partial ordering*](https://en.wikipedia.org/wiki/Partially_ordered_set) of the input range, and this holds for both versions of the algorithm. In addition, the more general, version&nbsp;2 does not even require that the value-type of `I` be the same as `T`, as we'll soon see.

Originally, `Compare` was required to define a [*strict weak order*](https://en.wikipedia.org/wiki/Weak_ordering#Strict_weak_orderings) on `[first, last)`, but it was later pointed out that this requirement is stronger than needed {% cite lgw270 %}. A strict weak order has that the arguments to `cmp` be of the same type (as in `ValueType(I) == T`), but the applicability of `std::lower_bound` can be made even greater by allowing `cmp` to merely define a partition. This way `cmp`, together with `value`, can be thought of as a unary predicate $p(x) \equiv cmp(x, value)$ indicating subset membership.

The weaker requirement enables heterogeneous comparison between `value` and the elements of `[first, last)`, where `Compare` is potentially overloaded on different types:

```c++
struct multi_comp {
    bool operator() (X const& x, V const& value) const { /* ... */ }
    bool operator() (Y const& y, V const& value) const { /* ... */ }
    bool operator() (Z const& z, V const& value) const { /* ... */ }
    // ...
};
```

A simpler example given in {% cite lgw270 %} shows how a collection of records may be searched by defining `Compare` as such:

```c++
struct key_comp {
    bool operator() (X const& x, int n) const {
        return x.key() < n;
    }
};
```

In general, we can always supply arguments that satisfy stricter requirements than those specified. In the above `main` function, for example, a vector of integers is given to `lower_bound`, together with an instance of `std::less<int>` (equivalent to calling version&nbsp;1) and a search key of 4. Here, `std::less<int>` defines a [*total order*](https://en.wikipedia.org/wiki/Total_order), in which any two elements of the range can be compared. This is sufficient but exceeds even the requirements of a strict weak order (see [order theory](https://en.wikipedia.org/wiki/Order_theory) for more explanation).

### Complexity

A characteristic of binary search is that it executes in at most $\lceil log_2(n) \rceil$ comparisons per execution. There is no early termination in `std::lower_bound`, however, which terminates in exactly $\lceil log_2(n) \rceil$ iterations. Intuitively this makes sense because the algorithm searches for the first of a potential range of matches.

It should also be noted that the behaviour of [`next`](http://en.cppreference.com/w/cpp/iterator/next) depends on the type of `I`. As stated above, `I` must at least satisfy the requirements of `ForwardIterator`. When `I` additionally satisfies the requirements of [`RandomAccessIterator`](http://en.cppreference.com/w/cpp/concept/RandomAccessIterator), such as raw pointers do, `next` can run in constant time, otherwise it runs in linear time.

### Invariants

There are two invariants that contribute to proving the algorithm will both terminate and produce a correct result:

1. The value of `n` is nonnegative and strictly decreasing.

    **Proof**: Given the range `[first, last)` is initially valid, `n` is initialized to the nonnegative value $distance(first, last) \equiv last - first$. In each iteration of the while-loop, `n` is reduced by either $h = \lfloor n/2 \rfloor$ or $h + 1 = \lfloor n/2 \rfloor + 1$, but is not modified in any other way, so its value is strictly decreasing. Next, assume that in some iteration $i$, `n` is taken to a negative value. The most that `n` can can be reduced, in any iteration, is by half plus one. Thus we have that, at the start of the $(i+1)th$ iteration, $n_{i+1} = n_{i} - \lfloor n_{i}/2 \rfloor - 1 < 0 \Leftrightarrow n_{i} < 0$, which is a contradiction (recalling that $n_i$ cannot be zero because the loop would have terminated before starting another iteration). That is, `n` can only be made *more* negative, when it was *already* negative to begin with, which necessarily means that the algorithm was supplied with an invalid range. $\Box$

2. The subrange `[first, n)` is valid as per the expected behaviour of a binary search algorithm.

    **Proof**: Following from the first invariant, the length of the range `[first, n)` cannot exceed the length of the initial range `[first, last)`, or become negative. In each iteration, the median element at position $m = first + h = first + \lfloor n/2 \rfloor$ is chosen for the comparison with `value`. In the case that the comparison fails, the value of `n` is reduced by $\lfloor n/2 \rfloor$, selecting the left subrange. Conversely, when the comparison succeeds, `first` is moved to the right of `m` by one place, and `n` is reduced by $\lfloor n/2 \rfloor + 1$, selecting the right subrange. (Note that in either case `m` is excluded from the new subrange, as it has already been compared against.) The process proceeds inductively, until `n` is reduced to zero and the loop is exited. Thus `[first, n)` is valid as per the expected behaviour of binary search. $\Box$

### Termination

Termination follows from the first invariant. In each iteration, `n` is reduced by at most $h + 1 = \lfloor n/2 \rfloor + 1$. It is then by the integer division of `n` that it is guaranteed to eventually reach a value of zero, causing the loop to terminate (i.e. no such guarantee holds when `n` stores a floating-point value).

### Correctness

To show correctness, it needs to be shown that, upon termination, `first` will either point to the first element that *does not precede* (*is not less than*) `value`, or `last`. Assuming valid input arguments, the correctness of the algorithm follows from the second invariant.

For any iteration, the right subrange is selected when `*m` *precedes* (*is less than*) `value` (i.e. the comparison succeeds). In this case, the position of `first` is moved to the right of `m` by one place because we know that all values up to and including `m` can be discarded. Whether the new element pointed to by `first` precedes `value`, however, remains to be shown in a subsequent iteration. We may also say that when this case is true in one or more iterations, there is at least one element of the range that precedes `value`.

Conversely, the left subrange is selected when `*m` *does not precede* (*is not less than*) `value` (i.e. the comparison fails). In this case, the position of `first` remains unchanged, but because we know that all elements from `m` onward do not precede `value`, they can be discarded. We may also say that when this case is true in one or more iterations, it cannot be that `first` equals `last` upon termination---that is, the algorithm will not return a negative result.

Thus, `first` moves right only when it is known that all elements up to and including `*m` precede `value`. By induction we can infer that, upon termination, `first` will point to either first element that *does not precede* `value`, or `last`. We can also note the two extreme cases in which `first` remains unchanged for the duration of the algorithm (no element preceded `value`), and `first` equals `last` upon termination (all elements preceded `value`).

### Subtle Pitfalls

We have so far looked at the issues regarding requirements on template type parameters, but we have yet to discuss two more rather innocuous places wherein it is easy to introduce bugs.

First is a subtlety in our book keeping with respect to discarding elements after each comparison. For any iteration, we can consider that `[first, n) = [first, m)` $\cup$ `[m, n)` is the union of two halves about the median element `m`. We must be sure to discard `m` after each comparison, not only because it has already been compared against, but because failing to do so can result in a failure to terminate. Consider the scenario where `n = 1` and the comparison succeeds. Here, we would subtract `h = 0` from `n` (as opposed to `h + 1 = 1`), reflecting that `m` was not discarded. This produces an infinite loop, as `n` would never reach zero. Discarding `m` ensures that this problem is avoided.

Finally, some implementations might have `n` set by `(first + last)/2`. The problem here is that `first + last` can potentially lead to integer overflow when the input range is large. A correct implementation has `n` equivalently set by `(last - first)/2`.

## Conclusion

In this post I discussed the issues regarding implementing and using `std::lower_bound` in C++. Users of templated code must be careful to respect constraints on template type parameters. Further, the nature of working with C++ requires that close attention be paid to book keeping. All of this contributes to avoiding potentially hard to find bugs. C++ is known as a dangerous language because it affords programmers the freedom to perpetrate all manor of heinous atrocities. The corollary to this, however, is that C++ programmers also have the ability to generate code that is fast and efficient---and safe, so long as sufficient care is taken.

I tried my best to make the information herein correct, and understandable for most people with some knowledge in computer programming. If you have any questions or feedback, please feel free to post a comment below. And thanks for reading!

## References
{% bibliography --cited %}
