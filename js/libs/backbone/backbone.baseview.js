(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['backbone','underscore', 'jquery', 'backbone.associations'], factory);
    } else {
        // Browser globals
        root.BaseView = factory(root.Backbone,root._, root.jQuery);
    }
}(this, function (Backbone,_,$) {
    var Bindings = {
        text: function(model,key,el,formatter) {
            this.bind = _.bind(function() {
                model.on('change:'+key,this.update);
                this.update(model,model.get(key));
            },this);

            this.update = _.bind(function(model,val) {
                $(el).text(formatter(val,model));
            },this);

            this.unbind = _.bind(function() {
                model.off(null,this.update);
            },this);
        },
        attr: function(model,key,el,formatter) {
            key = key.match(/(.+)\((.+)\)/);

            var attr = key[1];
            key = key[2];

            this.bind = _.bind(function() {
                model.on('change:'+key,this.update,this);
                this.update(model,model.get(key));
            },this);

            this.update = _.bind(function(model,val) {
                $(el).attr(attr,formatter(val,model));
            });

            this.unbind = _.bind(function() {
                model.off(null,null,this);
            });
        },
        prop: function(model,key,el,formatter) {
            key = key.match(/(.+)\((.+)\)/);

            var attr = key[1];
            key = key[2];

            this.bind = _.bind(function() {
                model.on('change:'+key,this.update,this);
                this.update(model,model.get(key));
            },this);

            this.update = _.bind(function(model,val) {
                $(el).prop(attr,formatter(val,model));
            });

            this.unbind = _.bind(function() {
                model.off(null,null,this);
            });
        },
        show: function(model,key,el,formatter) {
            this.bind = _.bind(function() {
                model.on('change:'+key,this.update);
                this.update(model,model.get(key));
            },this);

            this.update = _.bind(function(model,val) {
                var show = formatter(val,model);

                if (show) {
                    $(el).show();
                }
                else {
                    $(el).hide();
                }
            },this);

            this.unbind = _.bind(function() {
                model.off(null,this.update);
            },this);
        },
        hide: function(model,key,el,formatter) {
            this.bind = _.bind(function() {
                model.on('change:'+key,this.update);
                this.update(model,model.get(key));
            },this);

            this.update = _.bind(function(model,val) {
                var show = !formatter(val,model);

                if (show) {
                    $(el).show();
                }
                else {
                    $(el).hide();
                }
            },this);

            this.unbind = _.bind(function() {
                model.off(null,this.update);
            },this);
        }
    };

    var BaseView = Backbone.View.extend({
        constructor: function(options) {
            this.parent = options.parent;
            this.subViews = [];
            this.bindings = [];

            this.scope = this.parent ? this.parent.scope : new Backbone.AssociatedModel();

            Backbone.View.prototype.constructor.apply(this,arguments);

            this.setupScope();
            this.findSubViews();
            this.setupBindings();
            this.setupEvents();
        },
        get: function(key) {
            if (this[key]) return this[key];

            if (this.model && this.model.get(String(key))) return this.model.get(key);

            if (this.parent && this.parent.get(key)) {
                return this.parent.get(key);
            }

            if (window[key]) return window[key];

            return key;
        },
        setupScope: function() {
            if (!this.model) {
                this.model = new Backbone.AssociatedModel();
            }

            this.model.relations = this.model.relations || [];

            this.model.relations.push({
                type: Backbone.One,
                relatedModel: Backbone.AssociatedModel.extend(),
                key: 'scope'
            });

            this.model.set('scope',this.scope, {silent:true});

            this.model.toJSON = (function(toJSON) {
                return function() {
                    var json = toJSON.call(this);

                    return _.omit(json,'scope');
                };
            })(this.model.toJSON);
        },
        setupEvents: function() {
            var boundSelectors = {};

            _bind = function(el) {
                var event = $(el).data('on').split(':')[0];
                var action = this.get($(el).data('on').split(':')[1]);
                var selector = "[data-on='"+event+":"+$(el).data('on').split(':')[1]+"']";

                if (!boundSelectors[selector]) {
                    this.$el.on(event,selector,_.bind(function(e) {
                        e.preventDefault();
                        action.apply(this,arguments);
                    },this));

                    boundSelectors[selector] = true;
                }

                //$(el).data('on',null);
                //el.removeAttribute('data-on');
            };

            if (this.$el.data('on')) {
                _bind.call(this,this.el);
            }

            _.each(this.$("[data-on]"),_bind,this);
        },
        findSubViews: function() {
            _.each(this.$("[data-view]"),function(el) {
                var View = this.get($(el).data('view'));

                if (View === undefined) {
                    return;
                }

                if (_.isString(View)) {
                    if (!window.require) return;

                    try {
                        View = require(this.get($(el).data('view')));
                    }
                    catch(e) {
                        return;
                    }
                }

                var viewKey = $(el).data('view');

                $(el).data('view',null);

                var options = View.prototype.options || {};

                if ($(el).data('options')) {
                    var parseValue = _.bind(function(value) {
                        if ($.isPlainObject(this.get(value))) {
                            var res = {};
                            _(this.get(value)).each(function(val,key) {
                                res[key] = parseValue(this.get(val));
                            },this);

                            return res;
                        }
                        else {
                            return this.get(value);
                        }
                    },this);

                    options = this.get($(el).data('options'));

                    _(options).each(function(val,key) {
                        options[key] = parseValue(this.get(val));
                    },this);
                }

                var view = new View(_.extend({
                    model: this.get($(el).data('model')) || this.model,
                    collection: this.get($(el).data('collection')) || View.prototype.collection,
                    el:el,
                    parent:this
                },options));

                this.subViews.push(view);
                this.subViews[viewKey] = view;
            },this);
        },
        $: function() {
            var $subViews = Backbone.View.prototype.$.call(this,"[data-view]");

            return Backbone.View.prototype.$.apply(this,arguments).not(function() {
                return _.any($subViews,function($subView) {
                    return $subView != this && $subView.contains(this);
                },this);
            });
        },
        setupBindings: function() {
            _.each(this.$("[data-bind]"),function(el) {
                var binding;
                var formatter = function(a){return a;};
                var key = $(el).data('bind');
                key = key.split(':');

                if (key[1] === undefined) {
                    binding = 'text';
                    key = key[0];
                }
                else {
                    binding = key[0];
                    key = key[1];
                }

                el.removeAttribute('data-bind');


                if (this.directives && this.directives[key]) {
                    formatter = this.directives[key];
                }

                var scopeBinding = new Bindings[binding](this.model,key,el,formatter);
                this.bindings.push(scopeBinding);
                scopeBinding.bind();
            },this);
        },
        remove: function() {
            _(this.subViews).invoke('remove');
            _(this.bindings).invoke('unbind');
            Backbone.View.prototype.remove.call(this);
        }
    });

    return BaseView;
}));