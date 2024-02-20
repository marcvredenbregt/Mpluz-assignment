var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
System.register("Dongle.model", [], function (exports_1, context_1) {
    "use strict";
    var DongleModel;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (DongleModel) {
                DongleModel[DongleModel["MNA110"] = 0] = "MNA110";
                DongleModel[DongleModel["MNA120"] = 1] = "MNA120";
                DongleModel[DongleModel["MNA420"] = 2] = "MNA420";
                DongleModel[DongleModel["MNA440"] = 3] = "MNA440";
                DongleModel[DongleModel["MNA240"] = 4] = "MNA240";
            })(DongleModel || (exports_1("DongleModel", DongleModel = {})));
        }
    };
});
System.register("Dongle.type", [], function (exports_2, context_2) {
    "use strict";
    var DongleType;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            (function (DongleType) {
                DongleType[DongleType["Encoder"] = 1] = "Encoder";
                DongleType[DongleType["Decoder"] = 2] = "Decoder";
                DongleType[DongleType["Transcoder"] = 3] = "Transcoder";
            })(DongleType || (exports_2("DongleType", DongleType = {})));
        }
    };
});
System.register("Dongle", ["uuid"], function (exports_3, context_3) {
    "use strict";
    var uuid_1, Dongle;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (uuid_1_1) {
                uuid_1 = uuid_1_1;
            }
        ],
        execute: function () {
            Dongle = (function () {
                function Dongle(model, type, ip) {
                    this._id = uuid_1.v4();
                    this._model = model;
                    this._type = type;
                    this._ip = ip;
                }
                Object.defineProperty(Dongle.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Dongle.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Dongle.prototype, "type", {
                    get: function () {
                        return this._type;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Dongle.prototype, "ip", {
                    get: function () {
                        return this._ip;
                    },
                    enumerable: false,
                    configurable: true
                });
                return Dongle;
            }());
            exports_3("Dongle", Dongle);
        }
    };
});
System.register("HelloWorld", [], function (exports_4, context_4) {
    "use strict";
    var HelloWorld;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            HelloWorld = (function () {
                function HelloWorld() {
                }
                HelloWorld.hello = function (name) {
                    if (name === void 0) { name = 'World'; }
                    return "Hello, ".concat(name, "!");
                };
                return HelloWorld;
            }());
            exports_4("HelloWorld", HelloWorld);
            HelloWorld.hello('Hello, James!');
            console.log(HelloWorld.hello('James'));
        }
    };
});
System.register("HelloWorld.spec", ["HelloWorld"], function (exports_5, context_5) {
    "use strict";
    var HelloWorld_1;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (HelloWorld_1_1) {
                HelloWorld_1 = HelloWorld_1_1;
            }
        ],
        execute: function () {
            describe('HelloWord', function () {
                it('says hello world with no name', function () {
                    expect(HelloWorld_1.HelloWorld.hello()).toEqual('Hello, World!');
                });
                it('says hello to Bob', function () {
                    expect(HelloWorld_1.HelloWorld.hello('Bob')).toEqual('Hello, Bob!');
                });
                it('says hello to Sally', function () {
                    expect(HelloWorld_1.HelloWorld.hello('Sally')).toEqual('Hello, Sally!');
                });
            });
        }
    };
});
System.register("Input.state", [], function (exports_6, context_6) {
    "use strict";
    var InputState;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            (function (InputState) {
                InputState[InputState["NoSignal"] = 0] = "NoSignal";
                InputState[InputState["Signal"] = 1] = "Signal";
            })(InputState || (exports_6("InputState", InputState = {})));
        }
    };
});
System.register("Input", ["Input.state"], function (exports_7, context_7) {
    "use strict";
    var Input_state_1, Input;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (Input_state_1_1) {
                Input_state_1 = Input_state_1_1;
            }
        ],
        execute: function () {
            Input = (function () {
                function Input(dongleId, inputNumber, state) {
                    if (state === void 0) { state = Input_state_1.InputState.NoSignal; }
                    this._id = dongleId + '-' + inputNumber;
                    this._state = state;
                }
                Object.defineProperty(Input.prototype, "state", {
                    get: function () {
                        return this._state;
                    },
                    set: function (state) {
                        this._state = state;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Input.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    enumerable: false,
                    configurable: true
                });
                return Input;
            }());
            exports_7("Input", Input);
        }
    };
});
System.register("IpUtilities", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    function isValidIp(ip) {
        var ipRegex = new RegExp('^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.' +
            '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.' +
            '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.' +
            '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$');
        return ipRegex.test(ip);
    }
    exports_8("isValidIp", isValidIp);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Output.state", [], function (exports_9, context_9) {
    "use strict";
    var OutputState;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [],
        execute: function () {
            (function (OutputState) {
                OutputState[OutputState["Disconnected"] = 0] = "Disconnected";
                OutputState[OutputState["Connected"] = 1] = "Connected";
            })(OutputState || (exports_9("OutputState", OutputState = {})));
        }
    };
});
System.register("Output", ["Input.state", "Output.state"], function (exports_10, context_10) {
    "use strict";
    var Input_state_2, Output_state_1, Output;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (Input_state_2_1) {
                Input_state_2 = Input_state_2_1;
            },
            function (Output_state_1_1) {
                Output_state_1 = Output_state_1_1;
            }
        ],
        execute: function () {
            Output = (function () {
                function Output(dongleId, outputNumber, state) {
                    if (state === void 0) { state = Output_state_1.OutputState.Disconnected; }
                    this._routedInput = null;
                    this._id = dongleId + '-' + outputNumber;
                    this._state = state;
                }
                Object.defineProperty(Output.prototype, "state", {
                    get: function () {
                        return this._state;
                    },
                    set: function (state) {
                        this._state = state;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Output.prototype, "routedInput", {
                    get: function () {
                        return this._routedInput;
                    },
                    enumerable: false,
                    configurable: true
                });
                Output.prototype.route = function (input) {
                    if (input.state !== Input_state_2.InputState.Signal) {
                        throw new Error('Input has no signal');
                    }
                    else {
                        this._routedInput = input;
                    }
                };
                Object.defineProperty(Output.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    enumerable: false,
                    configurable: true
                });
                return Output;
            }());
            exports_10("Output", Output);
        }
    };
});
System.register("Source", ["Dongle", "Dongle.model", "Dongle.type", "Input", "Input.state"], function (exports_11, context_11) {
    "use strict";
    var Dongle_1, Dongle_model_1, Dongle_type_1, Input_1, Input_state_3, Source;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (Dongle_1_1) {
                Dongle_1 = Dongle_1_1;
            },
            function (Dongle_model_1_1) {
                Dongle_model_1 = Dongle_model_1_1;
            },
            function (Dongle_type_1_1) {
                Dongle_type_1 = Dongle_type_1_1;
            },
            function (Input_1_1) {
                Input_1 = Input_1_1;
            },
            function (Input_state_3_1) {
                Input_state_3 = Input_state_3_1;
            }
        ],
        execute: function () {
            Source = (function (_super) {
                __extends(Source, _super);
                function Source(model, ip) {
                    var _this = _super.call(this, model, Dongle_type_1.DongleType.Encoder, ip) || this;
                    _this._inputs = [];
                    var inputCount = model === Dongle_model_1.DongleModel.MNA110 ? 1 : 2;
                    _this.createInputs(inputCount);
                    return _this;
                }
                Source.prototype.connectInput = function (inputId) {
                    var input = this._inputs.find(function (i) { return i.id === inputId; });
                    if (input) {
                        input.state = Input_state_3.InputState.Signal;
                    }
                };
                Source.prototype.disconnectInput = function (inputId) {
                    var input = this._inputs.find(function (i) { return i.id === inputId; });
                    if (input) {
                        input.state = Input_state_3.InputState.NoSignal;
                    }
                };
                Source.prototype.getInput = function (inputId) {
                    return this._inputs.find(function (i) { return i.id === inputId; }) || null;
                };
                Source.prototype.hasInputId = function (inputId) {
                    return this._inputs.some(function (i) { return i.id === inputId; });
                };
                Source.prototype.createInputs = function (count) {
                    for (var i = 1; i <= count; i++) {
                        this._inputs.push(new Input_1.Input(this.id, i));
                    }
                };
                return Source;
            }(Dongle_1.Dongle));
            exports_11("Source", Source);
        }
    };
});
System.register("Sink", ["Dongle", "Dongle.model", "Dongle.type", "Output", "Output.state"], function (exports_12, context_12) {
    "use strict";
    var Dongle_2, Dongle_model_2, Dongle_type_2, Output_1, Output_state_2, Sink;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (Dongle_2_1) {
                Dongle_2 = Dongle_2_1;
            },
            function (Dongle_model_2_1) {
                Dongle_model_2 = Dongle_model_2_1;
            },
            function (Dongle_type_2_1) {
                Dongle_type_2 = Dongle_type_2_1;
            },
            function (Output_1_1) {
                Output_1 = Output_1_1;
            },
            function (Output_state_2_1) {
                Output_state_2 = Output_state_2_1;
            }
        ],
        execute: function () {
            Sink = (function (_super) {
                __extends(Sink, _super);
                function Sink(model, ip) {
                    var _this = _super.call(this, model, Dongle_type_2.DongleType.Decoder, ip) || this;
                    _this._outputs = [];
                    var outputCount = model === Dongle_model_2.DongleModel.MNA110 ? 1 : 2;
                    _this.createOutputs(outputCount);
                    return _this;
                }
                Sink.prototype.connectOutput = function (outputId) {
                    var output = this._outputs.find(function (o) { return o.id === outputId; });
                    if (output) {
                        output.state = Output_state_2.OutputState.Connected;
                    }
                };
                Sink.prototype.disconnectOutput = function (outputId) {
                    var output = this._outputs.find(function (o) { return o.id === outputId; });
                    if (output) {
                        output.state = Output_state_2.OutputState.Disconnected;
                    }
                };
                Sink.prototype.isConnected = function (outputId) {
                    var output = this._outputs.find(function (i) { return i.id === outputId; });
                    return output ? output.state === Output_state_2.OutputState.Connected : false;
                };
                Sink.prototype.getOutput = function (outputId) {
                    return this._outputs.find(function (i) { return i.id === outputId; }) || null;
                };
                Sink.prototype.hasOutputId = function (outputId) {
                    return this._outputs.some(function (i) { return i.id === outputId; });
                };
                Sink.prototype.routeOutput = function (outputId, input) {
                    var output = this._outputs.find(function (o) { return o.id === outputId; });
                    if (output && output.state !== Output_state_2.OutputState.Connected) {
                        throw new Error('Output is not connected');
                    }
                    if (output) {
                        output.route(input);
                    }
                };
                Sink.prototype.createOutputs = function (count) {
                    for (var i = 1; i <= count; i++) {
                        this._outputs.push(new Output_1.Output(this.id, i));
                    }
                };
                return Sink;
            }(Dongle_2.Dongle));
            exports_12("Sink", Sink);
        }
    };
});
System.register("Router", ["IpUtilities"], function (exports_13, context_13) {
    "use strict";
    var IpUtilities_1, Router, router;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (IpUtilities_1_1) {
                IpUtilities_1 = IpUtilities_1_1;
            }
        ],
        execute: function () {
            Router = (function () {
                function Router(_or, _ip) {
                    this._or = _or;
                    this._ip = _ip;
                    this._sources = [];
                    this._sinks = [];
                    if (!IpUtilities_1.isValidIp(_ip)) {
                        throw new Error('Invalid IP');
                    }
                    if (_or === '') {
                        throw new Error('Invalid OR');
                    }
                }
                Object.defineProperty(Router.prototype, "ip", {
                    get: function () {
                        return this._ip;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Router.prototype, "or", {
                    get: function () {
                        return this._or;
                    },
                    enumerable: false,
                    configurable: true
                });
                Router.prototype.addSource = function (source) {
                    this._sources.push(source);
                };
                Router.prototype.addSink = function (sink) {
                    this._sinks.push(sink);
                };
                Router.prototype.route = function (inputId, outputId) {
                    var input = this.findInput(inputId);
                    var output = this.findOutput(outputId);
                    if (input && output) {
                        output.route(input);
                    }
                };
                Router.prototype.findInput = function (inputId) {
                    for (var _i = 0, _a = this._sources; _i < _a.length; _i++) {
                        var source = _a[_i];
                        var input = source.getInput(inputId);
                        if (input) {
                            return input;
                        }
                    }
                    return null;
                };
                Router.prototype.findOutput = function (outputId) {
                    for (var _i = 0, _a = this._sinks; _i < _a.length; _i++) {
                        var sink = _a[_i];
                        var output = sink.getOutput(outputId);
                        if (output) {
                            return output;
                        }
                    }
                    return null;
                };
                return Router;
            }());
            exports_13("default", Router);
            router = new Router('OR1', '10.74.25.10');
            console.log(router);
        }
    };
});
System.register("Router.spec", ["Router"], function (exports_14, context_14) {
    "use strict";
    var Router_1, or, ip;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [
            function (Router_1_1) {
                Router_1 = Router_1_1;
            }
        ],
        execute: function () {
            or = {
                valid: 'OR 1',
                invalid: ''
            };
            ip = {
                valid: '10.74.25.10',
                invalid: 'abc'
            };
            describe('Router initializing', function () {
                it('Router should be a class which throws when initiated an invalid OR', function () {
                    expect(function () { return new Router_1.default(or.invalid, ip.valid); }).toThrow('Invalid OR');
                });
                it('Router should be a class which throws when initiated an invalid ip', function () {
                    expect(function () { return new Router_1.default(or.valid, ip.invalid); }).toThrow('Invalid IP');
                });
                it('Router should return a instance of Router when initiated correctly', function () {
                    var router = new Router_1.default(or.valid, ip.valid);
                    expect(router).toBeInstanceOf(Router_1.default);
                });
                it('Router should return the ip when using the getter', function () {
                    var router = new Router_1.default(or.valid, ip.valid);
                    expect(router.ip).toEqual(ip.valid);
                });
                it('Router should return the OR when using the getter', function () {
                    var router = new Router_1.default(or.valid, ip.valid);
                    expect(router.or).toEqual(or.valid);
                });
            });
        }
    };
});
System.register("ipUtilities.spec", ["IpUtilities"], function (exports_15, context_15) {
    "use strict";
    var IpUtilities_2;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [
            function (IpUtilities_2_1) {
                IpUtilities_2 = IpUtilities_2_1;
            }
        ],
        execute: function () {
            describe('isValidIp', function () {
                it('should return true for valid IPs', function () {
                    expect(IpUtilities_2.isValidIp('192.168.1.1')).toBe(true);
                    expect(IpUtilities_2.isValidIp('255.255.255.255')).toBe(true);
                    expect(IpUtilities_2.isValidIp('0.0.0.0')).toBe(true);
                });
                it('should return false for invalid IPs', function () {
                    expect(IpUtilities_2.isValidIp('256.0.0.0')).toBe(false);
                    expect(IpUtilities_2.isValidIp('192.168.1')).toBe(false);
                    expect(IpUtilities_2.isValidIp('192.168.1.1.1')).toBe(false);
                    expect(IpUtilities_2.isValidIp('abc.def.ghi.jkl')).toBe(false);
                });
            });
        }
    };
});
