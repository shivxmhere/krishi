export class QueueService {
    private queue: any[] = [];

    enqueue(item: any) {
        this.queue.push(item);
    }

    dequeue() {
        return this.queue.shift();
    }

    get length() {
        return this.queue.length;
    }
}
