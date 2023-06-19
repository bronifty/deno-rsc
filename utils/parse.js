function parseJSX(key, value) {
  if (value === "$RE") {
    return Symbol.for("react.element");
  } else if (typeof value === "string" && value.startsWith("$$")) {
    return value.slice(1);
  } else {
    return value;
  }
}

const clientJSXObject = {
  $$typeof: "$RE",
  type: "html",
  key: null,
  ref: null,
  props: {
    children: [
      {
        $$typeof: "$RE",
        type: "head",
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: "$RE",
            type: "title",
            key: null,
            ref: null,
            props: { children: "My blog" },
            _owner: null,
            _store: {},
          },
        },
        _owner: null,
        _store: {},
      },
      {
        $$typeof: "$RE",
        type: "body",
        key: null,
        ref: null,
        props: {
          children: [
            {
              $$typeof: "$RE",
              type: "nav",
              key: null,
              ref: null,
              props: {
                children: [
                  {
                    $$typeof: "$RE",
                    type: "a",
                    key: null,
                    ref: null,
                    props: { href: "/", children: "Home" },
                    _owner: null,
                    _store: {},
                  },
                  {
                    $$typeof: "$RE",
                    type: "hr",
                    key: null,
                    ref: null,
                    props: {},
                    _owner: null,
                    _store: {},
                  },
                  {
                    $$typeof: "$RE",
                    type: "input",
                    key: null,
                    ref: null,
                    props: {},
                    _owner: null,
                    _store: {},
                  },
                  {
                    $$typeof: "$RE",
                    type: "hr",
                    key: null,
                    ref: null,
                    props: {},
                    _owner: null,
                    _store: {},
                  },
                ],
              },
              _owner: null,
              _store: {},
            },
            {
              $$typeof: "$RE",
              type: "main",
              key: null,
              ref: null,
              props: {
                children: {
                  $$typeof: "$RE",
                  type: "section",
                  key: null,
                  ref: null,
                  props: {
                    children: [
                      {
                        $$typeof: "$RE",
                        type: "h1",
                        key: null,
                        ref: null,
                        props: { children: "Welcome to my blog" },
                        _owner: null,
                        _store: {},
                      },
                      {
                        $$typeof: "$RE",
                        type: "div",
                        key: null,
                        ref: null,
                        props: {
                          children: [
                            {
                              $$typeof: "$RE",
                              type: "section",
                              key: null,
                              ref: null,
                              props: {
                                children: [
                                  {
                                    $$typeof: "$RE",
                                    type: "h2",
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: {
                                        $$typeof: "$RE",
                                        type: "a",
                                        key: null,
                                        ref: null,
                                        props: {
                                          href: "/test",
                                          children: "test",
                                        },
                                        _owner: null,
                                        _store: {},
                                      },
                                    },
                                    _owner: null,
                                    _store: {},
                                  },
                                  {
                                    $$typeof: "$RE",
                                    type: "article",
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [
                                        {
                                          $$typeof: "$RE",
                                          type: "h3",
                                          key: "0",
                                          ref: null,
                                          props: { children: ["h3"] },
                                          _owner: null,
                                          _store: {},
                                        },
                                        "\n",
                                        {
                                          $$typeof: "$RE",
                                          type: "p",
                                          key: "2",
                                          ref: null,
                                          props: {
                                            children: [
                                              "This is ",
                                              {
                                                $$typeof: "$RE",
                                                type: "strong",
                                                key: "1",
                                                ref: null,
                                                props: { children: ["a"] },
                                                _owner: null,
                                                _store: {},
                                              },
                                              " ",
                                              {
                                                $$typeof: "$RE",
                                                type: "em",
                                                key: "3",
                                                ref: null,
                                                props: { children: ["test"] },
                                                _owner: null,
                                                _store: {},
                                              },
                                              " of ~~markdown~~.\nand the comment system.",
                                            ],
                                          },
                                          _owner: null,
                                          _store: {},
                                        },
                                      ],
                                    },
                                    _owner: null,
                                    _store: {},
                                  },
                                ],
                              },
                              _owner: null,
                              _store: {},
                            },
                            {
                              $$typeof: "$RE",
                              type: "section",
                              key: null,
                              ref: null,
                              props: {
                                children: [
                                  {
                                    $$typeof: "$RE",
                                    type: "h2",
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: {
                                        $$typeof: "$RE",
                                        type: "a",
                                        key: null,
                                        ref: null,
                                        props: {
                                          href: "/dog",
                                          children: "dog",
                                        },
                                        _owner: null,
                                        _store: {},
                                      },
                                    },
                                    _owner: null,
                                    _store: {},
                                  },
                                  {
                                    $$typeof: "$RE",
                                    type: "article",
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [
                                        {
                                          $$typeof: "$RE",
                                          type: "h1",
                                          key: "0",
                                          ref: null,
                                          props: { children: ["dog markdown"] },
                                          _owner: null,
                                          _store: {},
                                        },
                                        "\n",
                                        {
                                          $$typeof: "$RE",
                                          type: "p",
                                          key: "2",
                                          ref: null,
                                          props: {
                                            children: ["yes hello this is dog"],
                                          },
                                          _owner: null,
                                          _store: {},
                                        },
                                        "\n",
                                        {
                                          $$typeof: "$RE",
                                          type: "ul",
                                          key: "4",
                                          ref: null,
                                          props: {
                                            children: [
                                              "\n",
                                              {
                                                $$typeof: "$RE",
                                                type: "li",
                                                key: "1",
                                                ref: null,
                                                props: {
                                                  children: ["dog list"],
                                                },
                                                _owner: null,
                                                _store: {},
                                              },
                                              "\n",
                                              {
                                                $$typeof: "$RE",
                                                type: "li",
                                                key: "3",
                                                ref: null,
                                                props: {
                                                  children: ["dog list"],
                                                },
                                                _owner: null,
                                                _store: {},
                                              },
                                              "\n",
                                              {
                                                $$typeof: "$RE",
                                                type: "li",
                                                key: "5",
                                                ref: null,
                                                props: {
                                                  children: ["dog list"],
                                                },
                                                _owner: null,
                                                _store: {},
                                              },
                                              "\n",
                                            ],
                                          },
                                          _owner: null,
                                          _store: {},
                                        },
                                        "\n",
                                        {
                                          $$typeof: "$RE",
                                          type: "p",
                                          key: "6",
                                          ref: null,
                                          props: {
                                            children: [
                                              {
                                                $$typeof: "$RE",
                                                type: "img",
                                                key: null,
                                                ref: null,
                                                props: {
                                                  style: { maxWidth: "100%" },
                                                  src: "https://media.istockphoto.com/id/1430187772/photo/alert-border-collie-and-obedience-training.jpg?s=1024x1024&w=is&k=20&c=l-6GJ9mPVq36EtJOTAS8gDFj0GHI4UaShCuBHp7iikA=",
                                                  alt: "A dog image",
                                                },
                                                _owner: null,
                                                _store: {},
                                              },
                                            ],
                                          },
                                          _owner: null,
                                          _store: {},
                                        },
                                      ],
                                    },
                                    _owner: null,
                                    _store: {},
                                  },
                                ],
                              },
                              _owner: null,
                              _store: {},
                            },
                            {
                              $$typeof: "$RE",
                              type: "section",
                              key: null,
                              ref: null,
                              props: {
                                children: [
                                  {
                                    $$typeof: "$RE",
                                    type: "h2",
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: {
                                        $$typeof: "$RE",
                                        type: "a",
                                        key: null,
                                        ref: null,
                                        props: {
                                          href: "/hello-world",
                                          children: "hello-world",
                                        },
                                        _owner: null,
                                        _store: {},
                                      },
                                    },
                                    _owner: null,
                                    _store: {},
                                  },
                                  {
                                    $$typeof: "$RE",
                                    type: "article",
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [
                                        {
                                          $$typeof: "$RE",
                                          type: "p",
                                          key: "0",
                                          ref: null,
                                          props: { children: ["hello"] },
                                          _owner: null,
                                          _store: {},
                                        },
                                        "\n",
                                        {
                                          $$typeof: "$RE",
                                          type: "pre",
                                          key: "2",
                                          ref: null,
                                          props: {
                                            children: [
                                              {
                                                $$typeof: "$RE",
                                                type: "code",
                                                key: "0",
                                                ref: null,
                                                props: {
                                                  className: "language-js",
                                                  children: [
                                                    "var a = 1;\nvar b = 2;\nfunction add(a, b) {\n  return a + b;\n}\n",
                                                  ],
                                                },
                                                _owner: null,
                                                _store: {},
                                              },
                                            ],
                                          },
                                          _owner: null,
                                          _store: {},
                                        },
                                      ],
                                    },
                                    _owner: null,
                                    _store: {},
                                  },
                                ],
                              },
                              _owner: null,
                              _store: {},
                            },
                            {
                              $$typeof: "$RE",
                              type: "section",
                              key: null,
                              ref: null,
                              props: {
                                children: [
                                  {
                                    $$typeof: "$RE",
                                    type: "h2",
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: {
                                        $$typeof: "$RE",
                                        type: "a",
                                        key: null,
                                        ref: null,
                                        props: {
                                          href: "/cat-api",
                                          children: "cat-api",
                                        },
                                        _owner: null,
                                        _store: {},
                                      },
                                    },
                                    _owner: null,
                                    _store: {},
                                  },
                                  {
                                    $$typeof: "$RE",
                                    type: "article",
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [
                                        {
                                          $$typeof: "$RE",
                                          type: "h1",
                                          key: "0",
                                          ref: null,
                                          props: {
                                            children: [
                                              "To Get the Cat Api Key",
                                            ],
                                          },
                                          _owner: null,
                                          _store: {},
                                        },
                                        "\n",
                                        {
                                          $$typeof: "$RE",
                                          type: "ol",
                                          key: "2",
                                          ref: null,
                                          props: {
                                            children: [
                                              "\n",
                                              {
                                                $$typeof: "$RE",
                                                type: "li",
                                                key: "1",
                                                ref: null,
                                                props: {
                                                  children: [
                                                    "Go to the cat api website and sign up",
                                                  ],
                                                },
                                                _owner: null,
                                                _store: {},
                                              },
                                              "\n",
                                            ],
                                          },
                                          _owner: null,
                                          _store: {},
                                        },
                                        "\n",
                                        {
                                          $$typeof: "$RE",
                                          type: "p",
                                          key: "4",
                                          ref: null,
                                          props: {
                                            children: [
                                              '<a href="https://thecatapi.com/signup" target="_blank">',
                                              "Sign Up Here on the Cat Api Website",
                                              "</a>",
                                            ],
                                          },
                                          _owner: null,
                                          _store: {},
                                        },
                                        "\n",
                                        {
                                          $$typeof: "$RE",
                                          type: "p",
                                          key: "6",
                                          ref: null,
                                          props: {
                                            children: [
                                              {
                                                $$typeof: "$RE",
                                                type: "img",
                                                key: null,
                                                ref: null,
                                                props: {
                                                  style: { maxWidth: "100%" },
                                                  src: "https://cdn2.thecatapi.com/images/9qLSHCaQQ.jpg",
                                                  alt: "A medium cat image",
                                                },
                                                _owner: null,
                                                _store: {},
                                              },
                                            ],
                                          },
                                          _owner: null,
                                          _store: {},
                                        },
                                        "\n",
                                        {
                                          $$typeof: "$RE",
                                          type: "ol",
                                          key: "8",
                                          ref: null,
                                          props: {
                                            start: 2,
                                            children: [
                                              "\n",
                                              {
                                                $$typeof: "$RE",
                                                type: "li",
                                                key: "1",
                                                ref: null,
                                                props: {
                                                  children: [
                                                    "\n",
                                                    {
                                                      $$typeof: "$RE",
                                                      type: "p",
                                                      key: "1",
                                                      ref: null,
                                                      props: {
                                                        children: [
                                                          "You will get an email with the key in it.",
                                                        ],
                                                      },
                                                      _owner: null,
                                                      _store: {},
                                                    },
                                                    "\n",
                                                  ],
                                                },
                                                _owner: null,
                                                _store: {},
                                              },
                                              "\n",
                                              {
                                                $$typeof: "$RE",
                                                type: "li",
                                                key: "3",
                                                ref: null,
                                                props: {
                                                  children: [
                                                    "\n",
                                                    {
                                                      $$typeof: "$RE",
                                                      type: "p",
                                                      key: "1",
                                                      ref: null,
                                                      props: {
                                                        children: [
                                                          "Copy the key from your email into the field on this page",
                                                        ],
                                                      },
                                                      _owner: null,
                                                      _store: {},
                                                    },
                                                    "\n",
                                                  ],
                                                },
                                                _owner: null,
                                                _store: {},
                                              },
                                              "\n",
                                            ],
                                          },
                                          _owner: null,
                                          _store: {},
                                        },
                                      ],
                                    },
                                    _owner: null,
                                    _store: {},
                                  },
                                ],
                              },
                              _owner: null,
                              _store: {},
                            },
                          ],
                        },
                        _owner: null,
                        _store: {},
                      },
                    ],
                  },
                  _owner: null,
                  _store: {},
                },
              },
              _owner: null,
              _store: {},
            },
            {
              $$typeof: "$RE",
              type: "footer",
              key: null,
              ref: null,
              props: {
                children: [
                  {
                    $$typeof: "$RE",
                    type: "hr",
                    key: null,
                    ref: null,
                    props: {},
                    _owner: null,
                    _store: {},
                  },
                  {
                    $$typeof: "$RE",
                    type: "p",
                    key: null,
                    ref: null,
                    props: {
                      children: {
                        $$typeof: "$RE",
                        type: "i",
                        key: null,
                        ref: null,
                        props: { children: ["(c) ", "Jae Doe", " ", 2023] },
                        _owner: null,
                        _store: {},
                      },
                    },
                    _owner: null,
                    _store: {},
                  },
                ],
              },
              _owner: null,
              _store: {},
            },
          ],
        },
        _owner: null,
        _store: {},
      },
    ],
  },
  _owner: null,
  _store: {},
};

const clientJSXString = JSON.stringify(clientJSXObject, null, 2);
const clientJSX = JSON.parse(clientJSXString, parseJSX);
// console.log("clientJSXString", clientJSXString);
// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
console.log("clientJSX", clientJSX);
