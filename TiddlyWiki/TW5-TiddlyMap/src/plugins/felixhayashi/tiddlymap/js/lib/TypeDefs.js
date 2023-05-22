/**
 * @typedef {string} TiddlerReference
 *
 * A reference (title) that identifies a tiddler.
 */

/**
 * @typedef {$tw.Tiddler|TiddlerReference} Tiddler
 *
 * Either a reference (title) that identifies the tiddler or an object
 * representation.
 */

/**
 * @typedef {string|number} Id
 *
 * An id used to identify a node or tiddler. Ids may only contain characters
 * that are valid when used as tiddlywiki field values.
 */

/**
 * @typedef {Object} Edge
 *
 * @property {Id} id - The id of the edge.
 * @property {Id} from - An id that refers to a {@link Node} and denotes the
 *     from part of an edge.
 * @property {Id} to - An id that refers to a {@link Node} and denotes the
 *     to part of an edge.
 * @property {string} label - The label of the edge that will be displayed
 *     in the rendered graph.
 * @property {string} [view] - An optional viewname to which the edge is
 *     bound to.
 *
 * An edge connects nodes in a vis.Network.
 */

/**
 * @typedef {Object} EdgeTypeSubscriberInfo
 *
 * @property {("_"|undefined)} [marker] - The marker of the edge type.
 * @property {string} [namespace] - The namespace of the edge type.
 * @property {string} [name] - The name of the edge type.
 * @property {boolean} [include=true] - Whether or not this subscriber should be registered.
 */

/**
 * @typedef {Object} Node
 *
 * This object is used by the vis.Network.
 *
 * @property {Id} id - The id of the node.
 * @property {string} label - The label of the node that will be displayed
 *     in the rendered graph.
 */

/**
 * @typedef {Object} Hashmap
 *
 * Sometimes it makes semantically more sense to call an object a hashmap.
 * Then it becomes clear that we are talking about a simple key-value store.
 */

/**
 * @typedef {Array.<*>|Hashmap.<Id, *>|vis.DataSet} Collection
 *
 * A collection contains a group of elements, usually nodes
 * (see {@link NodeCollection}) or edges (see {@link EdgeCollection}).
 *
 * A collection object corresponds to a {@link CollectionTypeString}.
 */

/**
 * @typedef {Array.<Edge>|Hashmap.<Id, Edge>|vis.DataSet} EdgeCollection
 *
 * A collection of edges.
 */

/**
 * @typedef {Array.<Node>|Hashmap.<Id, Node>|vis.DataSet} NodeCollection
 *
 * A collection of nodes.
 */

/**
 * @typedef {Array.<Tiddler>|Hashmap.<Id, Tiddler>} TiddlerCollection
 *
 * A collection of tiddlers.
 */

/**
 * @typedef {string|function} TiddlyWikiFilter
 *
 * A tiddlywiki filter expression or a compiled filter.
 */

/**
 * @typedef {Tiddler|string|ViewAbstraction} View
 *
 * A view is identified either by a tiddler reference (title),
 * a Tiddler instance or a label. Moreover, a ViewAbstraction
 * may be used as view representation.
 */

/**
 * @typedef {array|hashmap|dataset} CollectionTypeString
 *
 * Most of tiddlymap's select statements allow the user to choose one
 * of the specified output types, depending on what is most suitable.
 *
 * The output types relate to the different types of
 * {@link EdgeCollection} and {@link NodeCollection}.
 */

/**
 * @typedef {Object} Position
 *
 * An object containing x, y properties.
 *
 * @property {number} x - The x coordinate.
 * @property {number} y - The y coordinate.
 */

/**
 * @typedef {Object} Updates
 *
 * An object that carries information about wiki changes after a refresh cycle occurred.
 * This is a more advanced form of the changedTiddlers object.
 *
 * @property {Object<TiddlerReference, string>} changedTiddlers
 *    a TiddlyWiki changedTiddlers list that has all draft tiddler changes removed
 * @property {Object<string, boolean>} paths
 *    a list of root paths in which tiddler changes occured.
 */

/**
 * @typedef {string} EdgeTypeId
 *
 * An edge-type id string consists of the following parts of which the
 * first two are optional: `[marker][namespace:]name`
 *
 * Note: The colon is not considered to be part of the namespace but is required
 * if a namespace exists.
 */
