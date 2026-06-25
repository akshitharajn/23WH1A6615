## Logging Middleware

A structured JSON logger for campus notification system.

### Features
- Log levels: DEBUG, INFO, WARN, ERROR
- JSON formatted output with timestamp, context, message, metadata
- Environment-based log level control
- Works in both Node.js and browser

### Usage

```javascript
import { createLogger } from './logger.js';

const logger = createLogger('MyModule');

logger.debug('Debug message', { key: 'value' });
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error occurred', { error: err.message });
```

### Output Format
```json
{"timestamp":"2024-01-15T10:30:45.123Z","level":"INFO","context":"MyModule","message":"Info message"}
```

### Environment Configuration
Set `LOG_LEVEL` environment variable to control minimum level (default: DEBUG).
