/**
 * Breadth-first search: shortest hop counts in an unweighted graph.
 *
 * The graph is an adjacency matrix: graph[i][j] is 1 when there is an edge
 * from vertex i to vertex j. BFS visits the vertices in rings around the
 * start: first its neighbours, then theirs, and so on. A queue keeps that
 * order, so the first time a vertex is reached, it is reached by a shortest
 * path. Vertices that cannot be reached keep the distance Infinity.
 *
 * Time: O(V²) with a matrix, since finding the neighbours of a vertex scans a
 * whole row; O(V + E) with adjacency lists. Space: O(V).
 */

/**
 * @param {(0 | 1)[][]} graph adjacency matrix
 * @param {number} start
 * @returns {number[]} distance from `start` to every vertex, Infinity if unreachable
 */
export function bfs(graph, start) {
  const distance = graph.map(() => Infinity)
  distance[start] = 0
  const queue = [start]
  // A read index instead of shift(): shift() would move the whole queue each time.
  for (let head = 0; head < queue.length; head++) {
    const current = queue[head]
    graph[current].forEach((edge, neighbour) => {
      if (edge === 1 && distance[neighbour] === Infinity) {
        distance[neighbour] = distance[current] + 1
        queue.push(neighbour)
      }
    })
  }
  return distance
}

if (import.meta.main) {
  const graph = [
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0],
  ]
  console.log('hops from vertex 1:', bfs(graph, 1).join(' '))
}
