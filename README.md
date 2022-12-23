# OOP in modern JS

## Introduction

There are many ways to create objects in JS, but if we are talking about creating multiple independent objects with similar properties and functionality, today the two main ways are factory functions and classes. They both have some pros and cons - but in many cases the can be used interchangeably - according to personal preference.

_Note: There is also an "old" way (old in a sense that is rarely used in new code, but it's still a part of the language) - constructor functions. Another way would be constructing objects via `Object.create`. I will not focus on them in this writeup._

## Classes

Classes are a way to define objects' "blueprints" in a consistent, well structured way. They are fast, and **memory efficient**, as their methods are reused among their instances (which is not the case with factory functions). They also take care of all the complexity of raw constructor functions, and provide additional features, like ensuring proper instantiation, defining private members and extending built-in objects. They might be more verbose that factory functions, but it's a trade-off - brevity not always mean readability. For me they are more readable, but I acknowledge that it's somewhat subjective.

### Syntax

Simple class example:

```js
class Planet {
  #mass;
  #radius;
  #position = [0, 0];
  #rotation = 0;

  constructor(mass, radius) {
    this.#mass = mass;
    this.#radius = radius;
  }

  get mass() {
    return this.#mass;
  }

  get radius() {
    return this.#radius;
  }

  move(x, y) {
    this.#position = [x, y];
  }

  rotate(angle) {
    this.#rotation = angle;
  }
}
```

As you can see, we have a nice structure:

- properties declarations (some with initial values),
- constructor that initializes the object-specific properties,
- accessor methods to expose some information,
- list of methods that operate on object properties.

I won't go into details here, for good overview of class syntax visit [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

### Common misconceptions

> Classes are just a syntactic sugar over constructor functions

This statement is usually used as an accusation against classes. As if they are not needed, and are redundant. The thing is, other modern concepts as `async-await` or `for..of` loop are also a syntactic sugar, but almost no one says that we should not use them. Syntactic sugar is mostly a **good thing** (some may even say it is _sweet_, pun intended). It allows us to think on a higher level of abstractions, making code more readable and less error-prone.

Besides, classes are not _just_ syntactic sugar. They have unique features, like [private class members](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields), that can't be recreated with constructor functions (even with closures), or the ability to extend built-in objects (like `Error`, `Array`, etc).

> JS classes are not "real" classes, like in Java, Python, etc.

That's an interesting one. There is no such thing as the one true definition of classes. Class is an abstract concept - a "blueprint" for creating new objects, and is not bound to the specific implementation. I some languages (like C++) they are a compile-time concept, and you cant define them in runtime. In other languages, like JS, Python or Ruby, you can define them in runtime. In some languages classes are themselves objects, in others they are not. Some languages implement them via delegating / linking methods in other objects, some assemble them in other ways. In some languages they are immutable, in some you can modify them in runtime.

For example, if you look at Python classes, they work _very_ similar to their JS counterpart. Under the hood they are objects linking to other objects, just like in JS. But it would be hard to find a Python programmer that says that Python classes are not "real".

I think this weird sentiment in JS world is caused by the fact, that while in other languages how the class works "under the hood" was always an **implementation detail**, in JS we had to assemble the similar concept manually - so there exists the myth that JS is somewhat special in the way that objects work (it kind of is, but so is every other language, and there are often more similarities than differences).

So yeah, JS classes are just as real (or just as unreal) as Python, Ruby or Java classes.

> Classes are for Java / C# programmers that have to write some JS

While JS classes borrow some syntax from these languages, and they familiarity is part of the reason that they were added to the language, the main reason is that the big part of the community needed standardization. You see, websites were becoming more and more complex, and JS programmers were inventing their own abstractions over raw prototypes. There were many different ways to do it, and they wre often incompatible with each other. It was hard to maintain, hard to onboard new programmers in the project. Having a standardized way to do it alleviate these problems, so the ECMA committee (people responsible for JS specification) did just that - it looked how people _already_ use the language, and provided the uniform syntax.

_Note: JS syntax for classes being similar to other languages is a good compromise, there is no point in reinventing the wheel here. On a similar note, did you know that, loved by many, `async-await` syntax was heavily inspired by C# (almost a carbon-copy) - I don't here many cries that it has no place in JS._

> Classes hide what really goes "under the hood" (stated as a con)

Yes, that's _the point of abstractions_ - to hide the complexity, and allow us to write more high-level code. To be fair, not every abstraction is good. Abstractions can be "leaky", i.e. they do not properly encapsulate all the underlying complexity - the work most of the time, but for some cases complexity crawls back (and the abstractions becomes more of a burden, than help). Luckily, that's not the case with classes, they are pretty solid, and if you're not dealing with legacy code, you can never have a need to reach for raw prototypes.

> `this` keyword is unreliable, you should avoid it

To be fair, not having to deal with `this` _is_ simpler, no question about it. _But_, `this`, while having its quirks, is **well defined**, and you _have to_ understand how it works - there is a lot of code that relies on it (even in standard library). Also, using `this` is the only way to create memory-efficient objects (i.e. objects that delegate methods to their prototypes).

> You should always prefer factory functions over classes

As a rule of thumb, if you hear someone saying that you should **always**, or **never** do something in programming, you can safely ignore them. Everything need context, it's no different in this case. While factory functions can be conceptually simpler, they are also less memory-efficient, and suffer (to a lesser degree) the same problem that the "pre-classes" abstractions did - there is multiple ways to write them, everyone seems to have their pet implementation.

> Inheritance is always bad

Another **always** BS. While it is a good practice to _prefer composition over inheritance_, it is nevertheless **prefer**, i.e. if both concepts make sense for a specific use case - you should probably use composition. Inheritance has it's problems, but when used wisely in a proper context, it can simplify the code.

> Object merging is an object composition

That's I think is the biggest offender, nad frankly, embarrassing misconception that is unique to the JS community. Sadly, it is very prevalent. Composition in the context of OOP has very specific meaning. In short, composition is when objects **contain references to other objects**, not when multiple object are merged into one. If you merge objects, it is a form of _multiple inheritance_. Using the famous rule "favor composition over inheritance" by [Gang of Four](https://en.wikipedia.org/wiki/Design_Patterns), while promoting the exact opposite, is truly a peak of irony. Don't get me wrong, object merging is a legitimate technique, but it has nothing to do with object composition in the GoF sense.
